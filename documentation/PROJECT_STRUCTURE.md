# Structure du projet IAKOA Backend

```
backend/
├── prisma/
│   ├── schema.prisma              # Schéma de la base de données
│   └── migrations/
│       └── 20251118150508_init_users/
│           └── migration.sql      # Migration initiale
│
├── src/
│   ├── app.module.ts              # Module principal de l'application
│   ├── main.ts                    # Point d'entrée de l'application
│   │
│   ├── prisma/                    # Module Prisma
│   │   ├── prisma.module.ts       # Module global pour Prisma
│   │   └── prisma.service.ts      # Service de connexion Prisma
│   │
│   ├── users/                     # Module Users (CRUD)
│   │   ├── users.module.ts        # Module
│   │   ├── users.controller.ts    # Controller (routes REST)
│   │   ├── users.service.ts       # Service (logique métier)
│   │   ├── entities/
│   │   │   └── user.entity.ts     # Entité User
│   │   └── dto/
│   │       ├── create-user.dto.ts # DTO pour créer un user
│   │       ├── update-user.dto.ts # DTO pour update un user
│   │       ├── login-user.dto.ts  # DTO pour login
│   │       ├── user-response.dto.ts # DTO de réponse (sans password)
│   │       └── index.ts           # Export des DTOs
│   │
│   └── auth/                      # Module Auth (JWT)
│       ├── auth.module.ts         # Module d'authentification
│       ├── auth.controller.ts     # Controller (/auth/register, /auth/login)
│       ├── auth.service.ts        # Service d'authentification
│       ├── strategies/
│       │   └── jwt.strategy.ts    # Stratégie JWT pour Passport
│       ├── guards/
│       │   └── jwt-auth.guard.ts  # Guard pour protéger les routes
│       └── decorators/
│           └── get-user.decorator.ts # Décorateur pour récupérer l'user
│
├── node_modules/                  # Dépendances
├── dist/                          # Build de production
│
├── .env                           # Variables d'environnement (ne pas committer)
├── .env.example                   # Exemple de configuration
├── .gitignore                     # Fichiers à ignorer par git
│
├── package.json                   # Dépendances et scripts
├── package-lock.json              # Lockfile des dépendances
├── tsconfig.json                  # Configuration TypeScript
├── nest-cli.json                  # Configuration NestJS CLI
│
└── Documentation/
    ├── README.md                  # Guide principal
    ├── API_USERS.md              # Documentation des routes API
    ├── TESTS_VALIDATION.md       # Tests effectués et validation
    ├── EXEMPLE_JWT_GUARD.md      # Exemples d'utilisation du JWT Guard
    ├── DEPLOYMENT_CHECKLIST.md   # Checklist avant déploiement
    └── PROJECT_STRUCTURE.md      # Ce fichier

```

## Modules principaux

### 1. PrismaModule (Global)
- **Service**: Gère la connexion à PostgreSQL
- **Export**: Disponible dans toute l'application
- **Lifecycle**: Se connecte au démarrage, se déconnecte à l'arrêt

### 2. UsersModule
- **Controller**: 7 routes REST (POST, GET, PATCH, DELETE)
- **Service**: Logique métier (CRUD, validation email, hashing password)
- **DTOs**: Validation des données avec class-validator
- **Export**: UsersService (utilisé par AuthModule)

### 3. AuthModule
- **Controller**: 2 routes (/auth/register, /auth/login)
- **Service**: Génération de JWT, validation des credentials
- **Strategy**: JWT Passport pour valider les tokens
- **Guard**: JwtAuthGuard pour protéger les routes
- **Decorator**: @GetUser() pour récupérer l'utilisateur connecté

## Routes disponibles

### Authentification
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion

### Users CRUD
- `POST /users` - Créer un utilisateur
- `GET /users` - Liste tous les utilisateurs
- `GET /users/:id` - Récupérer un utilisateur
- `PATCH /users/:id` - Mettre à jour
- `DELETE /users/:id` - Supprimer

### Autres
- `GET /` - Route racine (Hello World)

## Base de données

### Table: users
```sql
- id: UUID (primary key)
- createdAt: Timestamp
- updatedAt: Timestamp
- name: VARCHAR(30)
- password: TEXT (hashé avec bcrypt)
- email: TEXT (unique)
- isCreator: BOOLEAN (default: false)
- companies: TEXT[] (liste d'UUIDs)
- favorites: TEXT[] (liste d'UUIDs)
```

## Dépendances principales

### Production
- `@nestjs/core` - Framework NestJS
- `@nestjs/common` - Utilitaires NestJS
- `@nestjs/platform-express` - Adapter Express
- `@prisma/client` - Client Prisma ORM
- `@nestjs/jwt` - JWT pour NestJS
- `@nestjs/passport` - Passport pour NestJS
- `passport-jwt` - Stratégie JWT
- `bcrypt` - Hachage de mots de passe
- `class-validator` - Validation des DTOs
- `class-transformer` - Transformation des données
- `dotenv` - Variables d'environnement

### Développement
- `prisma` - CLI Prisma
- `typescript` - Langage
- `@nestjs/cli` - CLI NestJS
- `@types/*` - Types TypeScript
- `jest` - Framework de tests
- `eslint` - Linter
- `prettier` - Formatter

## Scripts disponibles

```bash
# Développement
npm run start          # Démarre l'app
npm run start:dev      # Démarre avec watch mode
npm run start:debug    # Démarre en mode debug

# Build
npm run build          # Compile l'application

# Production
npm run start:prod     # Démarre la version compilée

# Tests
npm run test           # Tests unitaires
npm run test:watch     # Tests en mode watch
npm run test:cov       # Couverture de code
npm run test:e2e       # Tests end-to-end

# Linting
npm run lint           # Vérifie le code
npm run format         # Formate le code

# Prisma
npx prisma generate    # Génère le client
npx prisma migrate dev # Crée et applique une migration
npx prisma studio      # Interface graphique
```

## Configuration

### Variables d'environnement (.env)
```env
DATABASE_URL="postgresql://olos@localhost/IAKOA-backend?host=/var/run/postgresql"
JWT_SECRET="votre-secret-super-securise"
PORT=3000
```

### Validation globale (main.ts)
- `whitelist: true` - Retire les propriétés non définies dans les DTOs
- `forbidNonWhitelisted: true` - Rejette les propriétés inconnues
- `transform: true` - Transforme automatiquement les types

### CORS
- Activé pour tous les domaines (à restreindre en production)

## Sécurité

### Implémenté ✅
- Hachage des mots de passe (bcrypt, 10 rounds)
- Validation des emails avec regex
- JWT avec expiration (7 jours)
- Validation stricte des entrées
- Mots de passe jamais exposés dans les réponses

### À implémenter 📋
- Rate limiting
- Helmet (security headers)
- Refresh tokens
- Vérification d'email
- Mot de passe oublié
- Protection CSRF

## Prochaines étapes

1. Implémenter les entités Company et Event
2. Ajouter les relations entre entités
3. Implémenter le système de favoris
4. Ajouter la recherche et les filtres
5. Géolocalisation des événements
6. Upload de médias
7. Tests unitaires et e2e
8. Documentation Swagger/OpenAPI
