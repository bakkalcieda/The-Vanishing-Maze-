// ------------------------------------- LOGIQUE DU JEUX -----------------------------------------//
//-------------------------------------------------------------------------------------------------------//
// 1. Configuration des niveaux 
// - je fais 3 niveaux qui deviennent de plus en plus dure 
// -chaque niveau a sa propre taille de grille, son temps de mémorisation et son rayon de vision.
// -Plus on avance, plus la grille est grande et plus le rayon  retrcit =>  niveau + difficile 
//--------------------------
// NIVEAU 1 : 
const NIVEAU1_COLONNES = 7;
const NIVEAU1_LIGNES = 7;
const NIVEAU1_TEMPS = 10000; // 10 secondes//
const NIVEAU1_RAYON = 2.2; // voit 2 cases autour de lui ( calcule pyhtagore )
//  je calcule la distance en ligne droite entre le joueuret chaque case du labyrinthe
//  formule :
//  distance = racine carrée de ( (colJoueur - colCase)² + (ligJoueur - ligCase)² )
//  exemple : joueur en (3,3) et case en (5,4)
//  distance = racine( (3-5)² + (3-4)² )
//           = racine( 4 + 1 )
//           = racine( 5 )
//           = 2.23
//  si 2.23 < rayon  →  la case EST visible
//  si 2.23 > rayon  →  la case N'EST PAS visible
//  c'est pour ca que le rayon 2.2 cache presque tout et que 2.5 montre plus de cases autour du joueur!!
//--------------------------------
// NIVEAU 2 : 
const NIVEAU2_COLONNES = 9;
const NIVEAU2_LIGNES = 9;
const NIVEAU2_TEMPS = 15000; // 15 secondes //
const NIVEAU2_RAYON = 2.0; // voit 2 cases autour de lui //
// NIVEAU 3
const NIVEAU3_COLONNES = 11;
const NIVEAU3_LIGNES = 11;
const NIVEAU3_TEMPS = 20000; // 20 secondes //
const NIVEAU3_RAYON = 1.8; //presuqe 2 case //
//----------
// fonction qui retourne les infos du niveau choisi
function recupererConfigNiveau(numero) {
    if (numero === 1) {
        return { colonnes: NIVEAU1_COLONNES, lignes: NIVEAU1_LIGNES, tempsMemoire: NIVEAU1_TEMPS, rayonVision: NIVEAU1_RAYON };
    }
    if (numero === 2) {
        return { colonnes: NIVEAU2_COLONNES, lignes: NIVEAU2_LIGNES, tempsMemoire: NIVEAU2_TEMPS, rayonVision: NIVEAU2_RAYON };
    }
    if (numero === 3) {
        return { colonnes: NIVEAU3_COLONNES, lignes: NIVEAU3_LIGNES, tempsMemoire: NIVEAU3_TEMPS, rayonVision: NIVEAU3_RAYON };
    }
}

//------------------------------------------------------------------------------------------------------------------------------------
// ---------------------- 2 : GÉNÉRATION DU LABYRINTHE --------------------------//
// - je crée une grille vide où chaque case a 4 murs
// - j'utilise l'algorithme "recursive backtracker"
// - il explore les cases au hasard et casse des murs pour créer des chemins
// - quand il est bloqué il recule jusqu'à trouver un autre chemin
// - quand toutes les cases sont visitées le labyrinthe est prêt
//--------------------------------------------------------------------------------------------------//
// chaque case a 4 murs et un statut visité
// 0 = pas visité / 1 = visité
function creerCase() {
    return {
        murHaut   : true,
        murBas    : true,
        murGauche : true,
        murDroit  : true,
        visite    : 0
    };
}

// je crée toutes les cases de la grille et je les stocke dans un objet
// la clé de chaque case est "col-lig" ex: "0-0", "1-0", "2-3"
function creerGrille(colonnes, lignes) {
    let grille = {};

    function remplirGrille(col, lig) {
        // si on a dépassé toutes les lignes, la grille est finie
        if (lig >= lignes) return;

        // si on a dépassé toutes les colonnes, on passe à la ligne suivante
        if (col >= colonnes) {
            remplirGrille(0, lig + 1);
            return;
        }

        // je crée la case et on passe à la colonne suivante
        grille[col + "-" + lig] = creerCase();
        remplirGrille(col + 1, lig);
    }

    remplirGrille(0, 0);
    return grille;
}

//--------------------------------------------------
// ALGORITHME RECURSIVE BACKTRACKER
// - je pars d'une case
// - je regarde mes voisins non visités
// - j'en choisis un au hasard et je casse le mur entre nous
// - je recommence depuis ce voisin
// - si je suis bloqué je recule automatiquement (récursion)
//--------------------------------------------------

function melangerTableau(tableau) {
    // je mélange le tableau avec Fisher-Yates
    let i = tableau.length;
    function melanger(i) {
        if (i <= 1) return tableau;
        let j = Math.floor(Math.random() * i);
        let temp = tableau[i - 1];
        tableau[i - 1] = tableau[j];
        tableau[j] = temp;
        return melanger(i - 1);
    }
    return melanger(i);
}

function genererLabyrinthe(grille, colonnes, lignes) {

    function explorer(col, lig) {
        // je marque la case comme visitée
        grille[col + "-" + lig].visite = 1;

        // mes 4 voisins possibles
        let voisins = [
            { col: col,     lig: lig - 1, direction: "haut"   },
            { col: col,     lig: lig + 1, direction: "bas"    },
            { col: col - 1, lig: lig,     direction: "gauche" },
            { col: col + 1, lig: lig,     direction: "droite" }
        ];

        // je mélange pour explorer dans un ordre aléatoire
        voisins = melangerTableau(voisins);

        function explorerVoisins(index) {
            if (index >= voisins.length) return;

            let voisin = voisins[index];
            let cle = voisin.col + "-" + voisin.lig;

            // je vérifie que le voisin existe et n'est pas visité
            if (
                voisin.col >= 0 && voisin.col < colonnes &&
                voisin.lig >= 0 && voisin.lig < lignes &&
                grille[cle].visite === 0
            ) {
                // je casse le mur entre moi et mon voisin
                if (voisin.direction === "haut") {
                    grille[col + "-" + lig].murHaut = false;
                    grille[cle].murBas = false;
                }
                if (voisin.direction === "bas") {
                    grille[col + "-" + lig].murBas = false;
                    grille[cle].murHaut = false;
                }
                if (voisin.direction === "gauche") {
                    grille[col + "-" + lig].murGauche = false;
                    grille[cle].murDroit = false;
                }
                if (voisin.direction === "droite") {
                    grille[col + "-" + lig].murDroit = false;
                    grille[cle].murGauche = false;
                }

                // je continue depuis ce voisin
                explorer(voisin.col, voisin.lig);
            }

            explorerVoisins(index + 1);
        }

        explorerVoisins(0);
    }

    // je commence depuis la case en haut à gauche
    explorer(0, 0);
    return grille;
}

// ----------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------- 3. STATE DU JEU -------------------------------------------------------------------------//
// - je stock tte les infos de la partie en cours ( position joueur,labyritnhe,niveau etc)

let etatJeu = {
    niveauActuel    : 1,        // niveau en cours (1, 2 ou 3)
    grille          : null,     // le labyrinthe généré
    colonnes        : 0,        // nb de colonnes de la grille
    lignes          : 0,        // nb de lignes de la grille
    rayonVision     : 0,        // rayon de vision du joueur
    tempsMemoire    : 0,        // temps pour mémoriser en ms

    joueur : {
        col : 0,                // colonne du joueur
        lig : 0                 // ligne du joueur
    },

    arrivee : {
        col : 0,                // colonne de l'arrivée
        lig : 0                 // ligne de l'arrivée
    },

    phaseJeu : "memorisation",  // "memorisation" ou "deplacement"
    partieTerminee : false      // true quand le joueur a gagné
};

// -----------------------------------------------------------------------------//
//------------------------ 4) Initizisation partie ------------------------------//
// - je charge la config du niveau
// - je crée et génère le labyrinthe
// - je place le joueur en haut à gauche
// - je place l'arrivée en bas à droite
// -------------------------------------------------------------------------------------------------------------------------------//
function initialiserPartie(numero) {
    let config = recupererConfigNiveau(numero);
    etatJeu.niveauActuel = numero;
    etatJeu.colonnes = config.colonnes;
    etatJeu.lignes   = config.lignes;
    etatJeu.rayonVision = config.rayonVision;
    etatJeu.tempsMemoire = config.tempsMemoire;

    // je genere le labyrinthe
    let grilleVide = creerGrille(config.colonnes, config.lignes);
    etatJeu.grille = genererLabyrinthe(grilleVide, config.colonnes, config.lignes);

    //joueur en haut a gauche
    etatJeu.joueur.col = 0;
    etatJeu.joueur.lig = 0;

    //arrivée en bas à droite 
    etatJeu.arrivee.col = config.colonnes - 1;
    etatJeu.arrivee.lig = config.lignes - 1;

    etatJeu.phaseJeu = "memorisation";
    etatJeu.partieTerminee = false;
}

//-------------------------------------------------------------------------------------------------------------------//
//------------------------ 5) Deplacement du joueur -------------------------------//
//- verifier que le mur n'est pas présent avant de bouger //
// -je verifie que le joueur ne sort pas de la grille //
//joueur arrive à l'arrivée, la partie est terminée // 
//------------------------------------------------------------------------------------------------------------------------------------- //
function deplacerJoueur(direction) {
    //on ne peut pas bouger pdnt la mémo ou si la partie est finie
    if (etatJeu.phaseJeu !== "deplacement") return;
    if (etatJeu.partieTerminee) return;

    let col = etatJeu.joueur.col;
    let lig = etatJeu.joueur.lig;
    let caseActuelle = etatJeu.grille[col + "-" + lig];

    if (direction === "haut") {
        // verifie qu'il n'y a pas de mur en haut et qu'on sort pas de la grille
        if (lig > 0 && caseActuelle.murHaut === false) {
            etatJeu.joueur.lig = lig - 1;
        }
    }

    if (direction === "bas") {
        if (lig < etatJeu.lignes - 1 && caseActuelle.murBas === false) {
            etatJeu.joueur.lig = lig + 1;
        }
    }

    if (direction === "gauche") {
        if (col > 0 && caseActuelle.murGauche === false) {
            etatJeu.joueur.col = col - 1;
        }
    }

    if (direction === "droite") {
        if (col < etatJeu.colonnes - 1 && caseActuelle.murDroit === false) {
            etatJeu.joueur.col = col + 1;
        }
    }

    // je vérifie si le joueur est arrivé à l'arrivée
    if (
        etatJeu.joueur.col === etatJeu.arrivee.col &&
        etatJeu.joueur.lig === etatJeu.arrivee.lig
    ) {
        etatJeu.partieTerminee = true;
    }
}

//-------------------------------------------------------------------------------------------------------------//
//------------------------------ 6) les touches clavier --------------------------------------------//
// - fleches haut / bas/droite et gauche 
// j'appelle deplacerJoueur avec la bonne direction
//- redessiner le labyrinth apres chauqe mouvement 
//------------------------------------------------------------------------//
document.addEventListener("keydown", function(e) {

    if (e.key === "ArrowUp")    deplacerJoueur("haut");
    if (e.key === "ArrowDown")  deplacerJoueur("bas");
    if (e.key === "ArrowLeft")  deplacerJoueur("gauche");
    if (e.key === "ArrowRight") deplacerJoueur("droite");

    // je redessine après chaque mouvement
    dessinerLabyrinthe();

    // si la partie est terminée j'affiche le message de victoire
    if (etatJeu.partieTerminee) {
        afficherVictoire();
    }
});

//------------------------------------------------------------------------------------------------//
//-----------------------------7) Dessiner le labyrinthe--------------------------------//
//- je dois parcourir tte les cases de la grille
// - je dessine les murs de chaque case //
//- je dessine le joueur et l'arrivée //
// - je gére le rayon de vision/brouillard 
//----------------------------------------------------------------------------------------------------------------
function dessinerLabyrinthe() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let taille = 40; //taille d'une case en pixels//
    canvas.width  = etatJeu.colonnes * taille;
    canvas.height = etatJeu.lignes   * taille;

    //je vide le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function dessinerCase(col, lig) {
        if (col >= etatJeu.colonnes) {
            dessinerCase(0, lig + 1);
            return;
        }
        if (lig >= etatJeu.lignes) return;

        let x = col * taille;
        let y = lig * taille;
        let cle = col + "-" + lig;
        let caseActuelle = etatJeu.grille[cle];

        // je calcule la distance entre cette case et le joueur
        let distCol = Math.abs(col - etatJeu.joueur.col);
        let distLig = Math.abs(lig - etatJeu.joueur.lig);
        let distance = Math.sqrt(distCol * distCol + distLig * distLig);

        // si on est en phase déplacement et hors du rayon de vision, je cache la case
        if (etatJeu.phaseJeu === "deplacement" && distance > etatJeu.rayonVision) {
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, taille, taille);
            dessinerCase(col + 1, lig);
            return;
        }

        // je dessine le fond de la case
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, taille, taille);

        // je dessine les murs
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        if (caseActuelle.murHaut) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + taille, y);
            ctx.stroke();
        }
        if (caseActuelle.murBas) {
            ctx.beginPath();
            ctx.moveTo(x, y + taille);
            ctx.lineTo(x + taille, y + taille);
            ctx.stroke();
        }
        if (caseActuelle.murGauche) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + taille);
            ctx.stroke();
        }
        if (caseActuelle.murDroit) {
            ctx.beginPath();
            ctx.moveTo(x + taille, y);
            ctx.lineTo(x + taille, y + taille);
            ctx.stroke();
        }

        dessinerCase(col + 1, lig);
    }

    dessinerCase(0, 0);

    // je dessine l'arrivée en vert
    ctx.fillStyle = "green";
    ctx.fillRect(
        etatJeu.arrivee.col * taille + 5,
        etatJeu.arrivee.lig * taille + 5,
        taille - 10,
        taille - 10
    );

    // je dessine le joueur en rouge
    ctx.fillStyle = "red";
    ctx.fillRect(
        etatJeu.joueur.col * taille + 5,
        etatJeu.joueur.lig * taille + 5,
        taille - 10,
        taille - 10
    );
}

//---------------------------------------------------------------------------------------------------//
//---------------------- 8. TIMER DE MEMORISATION -------------------------------------------------------//
// - pendant X seconde le joueur voit tt le labyrinthe
//- qd le temps est écoulé on passe en déplacement 
//- le brouillard s'active et le joueur doit se souvenir du chemin //
//--------------------------------------------------------------------------------------------------------------------------//
function lancerMemorisation() {
    etatJeu.phaseJeu = "memorisation";
    dessinerLabyrinthe();

    // j'affiche compte à rebours => converti en seconde 
    let tempsRestant = etatJeu.tempsMemoire / 1000;

    let interval = setInterval(function() {
        tempsRestant = tempsRestant - 1;

        // je mets à jour l'affichage du timer
        let elementTimer = document.getElementById("timer");
        if (elementTimer) {
            elementTimer.textContent = "Mémorise ! " + tempsRestant + "s";
        }

        // quand le temps est écoulé je passe en phase déplacement
        if (tempsRestant <= 0) {
            clearInterval(interval);
            etatJeu.phaseJeu = "deplacement";
            dessinerLabyrinthe();

            let elementTimer = document.getElementById("timer");
            if (elementTimer) {
                elementTimer.textContent = "À toi de jouer !";
            }
        }
    }, 1000);
}

//---------------------------------------------------------------------------------------------------//
//---------------------- 9. AFFICHER VICTOIRE -------------------------------------------------------//
// - j'affiche un message de victoire
// - si c'est pas le dernier niveau j'affiche le bouton pour passer au suivant
// - si c'est le niveau 3 j'affiche un message de fin de jeu
//---------------------------------------------------------------------------------------------------//
function afficherVictoire() {
    let elementMessage = document.getElementById("message");

    if (etatJeu.niveauActuel < 3) {
        // il reste des niveaux
        if (elementMessage) {
            elementMessage.textContent = "Bravo ! Tu as trouvé la sortie !";
        }

        // j'affiche le bouton pour passer au niveau suivant
        let boutonSuivant = document.getElementById("boutonSuivant");
        if (boutonSuivant) {
            boutonSuivant.style.display = "block";
        }
    } else {
        // c'est le dernier niveau
        if (elementMessage) {
            elementMessage.textContent = "Félicitations ! Tu as terminé tous les niveaux !";
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------------//
//----------------------- 10. Passer au niveau suivant ----------------------------------------------------//
//- - je recup le bouton dans le html//
//- au clic je lance le niveau suivant //
//--------------------------------------------------------------------------------------------------------------------------------
let boutonSuivant = document.getElementById("boutonSuivant");
if (boutonSuivant) {
    boutonSuivant.addEventListener("click", function() {

        // je cache le bouton
        boutonSuivant.style.display = "none";

        // je vide le message
        let elementMessage = document.getElementById("message");
        if (elementMessage) {
            elementMessage.textContent = "";
        }

        // je lance le niveau suivant
        let niveauSuivant = etatJeu.niveauActuel + 1;
        initialiserPartie(niveauSuivant);
        lancerMemorisation();
    });
}

// -----------------------------------------------------------------------------------------------------------------------//
//------------------------ Lancement du jeu --------------------------------------------//
// démarer le jeu sur niveau 1//
initialiserPartie(1);
lancerMemorisation();
