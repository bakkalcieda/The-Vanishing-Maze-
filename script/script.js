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
