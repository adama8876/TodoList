document.addEventListener("DOMContentLoaded", function(){
    const champFormulaire= document.getElementById("champ_formulaire");
    const date= document.getElementById("date");
    const priorite= document.getElementById("priorite");
    const status= document.getElementById("status");
    const addbtn= document.getElementById("addbtn");
    const addList= document.getElementById("addList");

    addbtn.addEventListener("click", function(){
        const addContent= champFormulaire.value.trim();
        const dateContent= date.value.trim();
        const prioriteContent= priorite.value.trim();
        const statusContent= status.value.trim();
        
        // Vérifiez que tous les champs ne sont pas vides
        if(addContent !== "" && dateContent !== "" && prioriteContent !== "" && statusContent !== ""){
            // Créez et ajoutez un nouvel élément à la liste
            const newAdd= document.createElement("li");
            newAdd.classList.add("tache");
            newAdd.innerHTML= `
                <span> ${addContent}</span>
                <span> ${dateContent}</span>
                <span> ${prioriteContent}</span>
                <span> ${statusContent}</span>
                <button class="deleteBtn">supprimer</button>
            `;
            addList.appendChild(newAdd);
            // Effacez les champs après l'ajout de la tâche et définissez le focus sur le champ du formulaire
            champFormulaire.value="";
            date.value="";
            priorite.value="";
            status.value="";
            champFormulaire.focus();
        } else {
            // Affichez un message d'erreur ou effectuez une action appropriée si un champ est vide
            alert("Veuillez remplir tous les champs.");
        }
    });
    
    addList.addEventListener("click", function(event){
        if(event.target.classList.contains("deleteBtn")){
            event.target.parentElement.remove();
        }
    });
});