document.addEventListener("DOMContentLoaded", function(){
    const champFormulaire = document.getElementById("champ_formulaire");
    const date = document.getElementById("date");
    const priorite = document.getElementById("priorite");
    const addbtn = document.getElementById("addbtn");
    const tableau = document.querySelector(".tableau table"); // Sélectionner le tableau
    const completedTasksCount = document.getElementById("completedTasksCount");

    // Charger les tâches enregistrées au chargement de la page
    loadTasks();

    addbtn.addEventListener("click", function(){
        const addContent = champFormulaire.value.trim();
        const dateContent = date.value.trim();
        const prioriteContent = priorite.value.trim();
        
        // Vérifiez que tous les champs ne sont pas vides
        if(addContent !== "" && dateContent !== "" && prioriteContent !== ""){
            // Créer une nouvelle ligne dans le tableau
            const newRow = tableau.insertRow(-1); // -1 pour insérer à la fin
            newRow.classList.add("new-row");

            // Créer les cellules (td) et les ajouter à la ligne du tableau
            const cell1 = newRow.insertCell(0);
            cell1.textContent = addContent;
            
            const cell2 = newRow.insertCell(1);
            cell2.textContent = dateContent;
            
            const cell3 = newRow.insertCell(2);
            cell3.textContent = prioriteContent;

            const cell4 = newRow.insertCell(3);
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("status");
            checkbox.addEventListener("change", function() {
                updateCompletedTasksCount();
            });
            cell4.appendChild(checkbox);

            const cell5 = newRow.insertCell(4);
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Supprimer";
            deleteBtn.classList.add("deleteBtn");
            deleteBtn.addEventListener("click", function() {
                newRow.remove(); // Supprimer la ligne du tableau
                updateCompletedTasksCount();
            });
            cell5.appendChild(deleteBtn);

            // Enregistrer la tâche ajoutée
            saveTask(addContent, dateContent, prioriteContent);

            // Effacez les champs après l'ajout de la tâche et définissez le focus sur le champ du formulaire
            champFormulaire.value="";
            date.value="";
            priorite.value="";
            champFormulaire.focus();
        } else {
            // Affichez un message d'erreur ou effectuez une action appropriée si un champ est vide
            alert("Veuillez remplir tous les champs.");
        }
    });

    // Fonction pour charger les tâches depuis le stockage local
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const newRow = tableau.insertRow(-1); // -1 pour insérer à la fin

            // Créer les cellules de données (td) et les ajouter à la ligne
            const cell1 = newRow.insertCell(0);
            cell1.textContent = task.content;
            
            const cell2 = newRow.insertCell(1);
            cell2.textContent = task.date;
            
            const cell3 = newRow.insertCell(2);
            cell3.textContent = task.priority;

            const cell4 = newRow.insertCell(3);
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("status");
            checkbox.checked = task.status === "complete"; // Cocher la case si le statut est "complete"
            checkbox.addEventListener("change", function() {
                updateCompletedTasksCount();
            });
            cell4.appendChild(checkbox);

            const cell5 = newRow.insertCell(4);
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Supprimer";
            deleteBtn.classList.add("deleteBtn");
            deleteBtn.addEventListener("click", function() {
                newRow.remove(); // Supprimer la ligne du tableau
                updateCompletedTasksCount();
            });
            cell5.appendChild(deleteBtn);
        });
        // Mettre à jour le compteur de tâches complètes
        updateCompletedTasksCount();
    }

    // Fonction pour enregistrer une tâche dans le stockage local
    function saveTask(content, date, priority) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({content, date, priority, status: "En cours"});
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Fonction pour mettre à jour le compteur de tâches complètes
    function updateCompletedTasksCount() {
        const completedTasks = document.querySelectorAll(".status:checked").length;
        completedTasksCount.textContent = `Nombre de tâches complètes : ${completedTasks}`;
    }
});
