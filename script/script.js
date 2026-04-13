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
// -- 2 : GÉNÉRATION DU LABYRINTHE ---//
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