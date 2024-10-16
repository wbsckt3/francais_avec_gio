function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const img = document.getElementById(data);
    ev.target.appendChild(img);
}

function checkAnswers() {
    const correctAnswers = {
        concept1: "img1", // Tourner à gauche
        concept2: "img2", // Tourner à droite
        concept3: "img3"  // Aller tout droit
        // Ajoutez les autres correspondances ici
    };

    let score = 0;

    for (let concept in correctAnswers) {
        const conceptDiv = document.getElementById(concept);
        const img = conceptDiv.querySelector('img');
        if (img && img.id === correctAnswers[concept]) {
            score++;
        }
    }

    alert(`Votre score est : ${score} sur ${Object.keys(correctAnswers).length}`);
}
