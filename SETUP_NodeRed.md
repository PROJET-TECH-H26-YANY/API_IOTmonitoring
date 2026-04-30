## 6. Configuration des flux Node-RED
Pour que Node-RED traite correctement les données MQTT et l'API :

1. Accédez à l'interface Node-RED via votre navigateur (`http://VOTRE_IP:1880`).
2. Ouvrez le menu principal (en haut à droite) et cliquez sur **Import**.
3. Sélectionnez l'option pour importer un fichier.
4. Chargez le fichier `flows.json` (ou copiez-collez le code JSON de la configuration) fourni à la racine de ce projet.
5. Cliquez sur le bouton rouge **Deploy** en haut à droite pour activer les flux.
6. **Important :** Double-cliquez sur les nœuds MQTT ou HTTP pour vérifier que les adresses IP pointent bien vers `localhost` ou l'IP de votre serveur.