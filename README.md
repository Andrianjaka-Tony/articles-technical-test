# Pré-requis et étapes d'installation :

## Frontend :

- lancer la commande `pnpm install`
- créer un fichier .env

```bash
NEXT_PUBLIC_CHATBOT_API_URL="http://localhost:8001/chat"
```

## Backend :

- lancer la commande `uvicorn main:app --reload --port 8001`

# Choix techniques :

## Stockage des données et informations :

pour le stockage des données et des informations, j'ai uniquement utilisé des **fichiers json**

## librairies utilisées :

### Frontend :

- zod
- sass
- lucide-react
- react-query

### Backend :

- fastapi
- uvicorn
- pydantic

## Organisation du code :

### Frontend :

- dossier src : contient tous les composants, services, fonctions d'appel APIs et les DTOs
- dossier app : contient les pages et les APIs en Next JS

### Backend :

- models.py : contient les modèles
- search.py : contient la fonction de recherche
- utils.py : contient les fonctions utilisataires
- main.py : fichier principal

# Limites et améliorations :

## Améliorations :

- intégrer la fonction de chatbot avec la fonction qui suit le standard API de l'application — malheureusement, faute de temps, je n'ai pas pu le faire à temps
- adapter l'API de chatbot avec le standand API du Next JS
