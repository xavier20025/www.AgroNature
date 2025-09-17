# Configuration EmailJS pour AgroNature

## Étapes de configuration :

### 1. Créer un compte EmailJS
- Allez sur https://www.emailjs.com/
- Créez un compte gratuit
- Confirmez votre email

### 2. Configurer le service email
- Dans le dashboard EmailJS, allez dans "Email Services"
- Cliquez sur "Add New Service"
- Choisissez votre fournisseur email (Gmail recommandé)
- Suivez les instructions pour connecter votre compte email

### 3. Créer un template d'email
- Allez dans "Email Templates"
- Cliquez sur "Create New Template"
- Utilisez ce template :

**Sujet :** Nouvelle commande AgroNature - {{order_number}}

**Corps du message :**
```
Bonjour,

Une nouvelle commande a été passée sur le site AgroNature.

DÉTAILS DE LA COMMANDE :
- Numéro de commande : {{order_number}}
- Date : {{order_date}}

INFORMATIONS CLIENT :
- Nom : {{customer_name}}
- Email : {{customer_email}}
- Téléphone : {{customer_phone}}
- Adresse de livraison : {{customer_address}}

ARTICLES COMMANDÉS :
{{order_items}}

RÉCAPITULATIF FINANCIER :
- Sous-total : {{subtotal}}€
- Frais de livraison : {{shipping}}€
- Réduction : {{discount}}
- TOTAL : {{total}}€

MODE DE PAIEMENT : {{payment_method}}

Cordialement,
Système automatique AgroNature
```

### 4. Obtenir les clés
- Allez dans "Account" > "General"
- Notez votre "Public Key"
- Dans "Email Services", notez votre "Service ID"
- Dans "Email Templates", notez votre "Template ID"

### 5. Mettre à jour le code
Remplacez dans script.js :
- `YOUR_PUBLIC_KEY` par votre clé publique
- `YOUR_SERVICE_ID` par votre ID de service
- `YOUR_TEMPLATE_ID` par votre ID de template

### 6. Test
- Passez une commande test sur le site
- Vérifiez que l'email arrive bien sur xaviergaye824@gmail.com

## Limites du plan gratuit EmailJS :
- 200 emails/mois
- Parfait pour débuter
- Possibilité d'upgrade si nécessaire

## Sécurité :
- Les clés publiques EmailJS sont sécurisées pour une utilisation frontend
- Aucune information sensible n'est exposée