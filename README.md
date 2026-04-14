# 🧩 The Vanishing Maze
### 🎮DEMO 
![Maze Demo](maze.gif)

---

 Français

### 📌 À propos du projet
The Vanishing Maze est un jeu web interactif où le joueur doit mémoriser puis traverser un labyrinthe généré aléatoirement.

La difficulté augmente à chaque niveau.

---

### ⚙️ Fonctionnement

#### 🧠 Génération du labyrinthe
Le labyrinthe est généré avec un algorithme de type Depth-First Search (DFS) utilisant le backtracking (recursive backtracker).

L’algorithme :
- part d’une case
- explore les voisins non visités au hasard
- casse les murs pour créer des chemins
- revient en arrière en cas d’impasse

Chaque labyrinthe est donc unique.

---

#### 🎮 Logique du jeu
Le jeu contient plusieurs niveaux :
- la taille de la grille augmente
- le temps de mémorisation change
- le rayon de vision diminue

Le joueur commence en haut à gauche et doit atteindre la sortie en bas à droite.

---

### 👁️ Système de vision (brouillard)
Pendant la phase de déplacement :
- le joueur ne voit qu’une partie du labyrinthe
- les cases visibles sont calculées avec une distance euclidienne

distance = √((x1 - x2)² + (y1 - y2)²)

Cela crée un effet de brouillard et rend le jeu plus stratégique.

---

#### 🎨 Affichage
Le labyrinthe est dessiné avec le Canvas HTML5 :
- dessin dynamique des cases et des murs
- affichage du joueur et de l’arrivée
- mise à jour en temps réel

---

### 🛠️ Technologies utilisées
- HTML
- CSS
- JavaScript
- Canvas API

---

### ⚙️ Fonctionnalités
- Génération aléatoire du labyrinthe (DFS + backtracking)
- Plusieurs niveaux de difficulté
- Phase de mémorisation avec timer
- Brouillard de vision
- Déplacement au clavier
- Rendu en temps réel

---

### 🧠 Ce que j’ai appris
- Logique algorithmique (DFS & récursion)
- Manipulation de grille
- Dessin avec Canvas
- Gestion des événements clavier
- Gestion de l’état du jeu

---

### ▶️ Lancer le projet
Ouvrir le fichier `index.html` dans un navigateur.

----------------------------------------------------------------------------------------------------------------

##  English

### 📌 About the project
The Vanishing Maze is an interactive web game where the player must memorize and navigate through a randomly generated maze.

The difficulty increases with each level, making the game more challenging over time.

---

### ⚙️ How it works

#### 🧠 Maze generation
The maze is generated using a Depth-First Search (DFS) algorithm with backtracking (also known as recursive backtracker).

The algorithm:
- Starts from a cell
- Randomly explores unvisited neighbors
- Removes walls to create paths
- Backtracks when it reaches a dead end

This ensures that every maze is unique.

---

#### 🎮 Game logic
The game is divided into multiple levels:
- Each level increases the grid size
- The memorization time changes
- The visibility radius decreases

The player starts at the top-left corner and must reach the exit at the bottom-right.

---

#### 👁️ Vision system (Fog of War)
During the movement phase:
- Only nearby cells are visible
- Visibility is based on Euclidean distance

distance = √((x1 - x2)² + (y1 - y2)²)

This creates a fog effect and makes the game more challenging.

---

#### 🎨 Rendering
The maze is drawn using the HTML5 Canvas API:
- Dynamic rendering of cells and walls
- Player and goal displayed in real time

---

### 🛠️ Tech used
- HTML
- CSS
- JavaScript
- Canvas API

---

### ⚙️ Features
- Random maze generation (DFS + backtracking)
- Multiple difficulty levels
- Memorization phase with timer
- Fog of war
- Keyboard movement
- Real-time rendering

---

### 🧠 What I practiced
- Algorithmic thinking (DFS & recursion)
- Grid-based logic
- Canvas rendering
- Keyboard event handling
- Game state management

---

### ▶️ Run it
Open `index.html` in your browser.
