# iSocial

### Contexte:

Le projet « iSocial » est un réseau social. Il met à disposition la majorité des outils attendu d’un réseau social. 
C’est un choix qui me paraissait formateur car il y a une grande quantité de fonctionnalité à mettre en place

### Fonctionnalités:

- Création/Authentification d’utilisateurs.
- Système de rôle pour les utilisateurs. (Utilisateur/Modérateur/Admin)
- Les modérateurs et les admins peuvent supprimer n’importe quelle publication dans l’application.
- Les admin ont un onglet depuis lequel on retrouve une liste des utilisateurs de l’application, possibilité de filtrer les utilisateurs via une barre de recherche. L’admin peut supprimer les utilisateurs depuis cet onglet.

- Créations de publications avec photo de profil, texte, des emojis et la possibilité d’ajouter une image.
- Système de like et de commentaires des publications.
- Page depuis laquelle on peut consulter l’ensemble des publications de l’application.
- Page de profil pour chaque utilisateur de l’application dans laquelle on retrouve une bannière de profil avec les informations (nom, email, photo de profil) ainsi que toutes les publications de l’utilisateur en question.
- Les utilisateurs peuvent changer leur photo de profil et supprimer leurs publications depuis leur page de profil
- On accède à la page de profil de l’utilisateur connecté via un onglet profil et a celle des autres utilisateurs en cliquant sur la photo de profil figurant sur leurs différentes publications.

### Technologies: 

Le développement frontend est réalisé en javascript a l’aide du framework React, version 18.2.0
Le développement backend est réalisé en Node.js a l’aide du framework Express.js version 4.18.2
La base de données est en langage SQL. Le gestionnaire de base de données MySQL a été utilisé durant le développement du projet. Mon utilisation de MySQL s’est accompagnée de Sequelize. Sequelize est un outil ORM (Object-relation mapping) qui permet de simuler une base de données orientée objet et met a dispositions les fonctionnalités CRUD (Create, Read, Update, Delete)
