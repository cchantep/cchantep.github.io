## Comprendre les métriques de classification en data science

La **classification** est l'une des applications les plus courantes de la data science, par exemple pour prédire si un email est un spam ou non.

Certaines métriques sont particulièrement utiles pour comprendre les performances des algorithmes/modèles de classification en data science : **accuracy**, **précision** et **rappel**.
Si vous vous intéressez à la data science ou à l'IA, vous avez probablement déjà rencontré ces termes. Cet article peut aider à mieux les comprendre.

Ces métriques peuvent parfois prêter à confusion, c'est pourquoi je souhaitais partager quelques éléments et exemples que j'ai trouvés particulièrement éclairants.

![Métriques de classification](https://github.com/cchantep/cchantep.github.io/blob/main/blog/_files/datascience-classification-metrics-1.png?raw=true)

### Matrice de confusion

Une représentation de base des résultats d'une classification est la **matrice de confusion**.

| ↓ Réalité / Prédiction → | Positif | Négatif |
| ------------------------: | :------: | :------: |
| Vrai                      | {TP}     | {FN}     |
| Faux                      | {FP}     | {TN}     |

Elle résume le nombre de :

- *{TP}* (**True Positive / Vrai positif**) - Nombre de prédictions positives vraies (correctes) (ex. un spam qui est réellement un spam)
- *{TN}* (**True Negative / Vrai négatif**) - Nombre de prédictions négatives vraies (correctes) (ex. un message qui n'est pas identifié comme spam, à juste titre)
- *{FP}* (**False Positive / Faux positif**) - Nombre de prédictions positives fausses (incorrectes) (ex. un message identifié comme spam alors qu'il ne l'est pas)
- *{FN}* (**False Negative / Faux négatif**) - Nombre de prédictions négatives fausses (incorrectes) (ex. un message non identifié comme spam alors qu'il aurait dû l'être)

Ces quatre valeurs permettent de calculer les métriques, mais passons à un exemple concret.

### Exemple : un robot de détection d'allergies à la cantine

Imaginez une cantine (dans une école ou une entreprise) où il existe un robot auquel vous pouvez demander de vérifier le plat que vous choisissez afin de vous assurer qu'il ne déclenchera pas votre allergie selon ses ingrédients.

Le robot peut être configuré selon deux modes différents, entraînant des comportements et des expériences utilisateur différents.

**😨 Paranoïaque**

Au moindre doute, le robot déclenche une alerte : mieux vaut prévenir que guérir.

- La plupart des plats à risque sont correctement détectés (*True Positive*).
- Très peu de plats à risque sont incorrectement considérés comme sûrs (*False Negative*), ce qui signifie que les situations dangereuses passent rarement inaperçues.
- Cependant, certains plats sans risque sont incorrectement signalés comme risqués (*False Positive*).
- Au final, le chef déteste le robot, qui voit des 🥜 partout — même dans la purée.

![Paranoïaque](https://github.com/cchantep/cchantep.github.io/blob/main/blog/_files/datascience-classification-metrics-2.png?raw=true)

**🧘 Zen**

Le robot cherche à éviter les alertes inutiles et préfère éviter de crier au loup.

- La plupart des plats sûrs sont correctement acceptés (*True Negative*).
- Peu de plats sûrs sont incorrectement signalés comme risqués (*False Positive*), ce qui évite les alertes inutiles.
- Cependant, certains plats à risque ne sont pas détectés (*False Negative*).
- Le chef est plus heureux, mais les personnes allergiques sont moins bien protégées.

![Zen](https://github.com/cchantep/cchantep.github.io/blob/main/blog/_files/datascience-classification-metrics-3.png?raw=true)

**ℹ️ Résumé**

Appliquons la matrice de confusion à cet exemple.

| ↓ Réalité / Ce que dit le robot → | "Risqué" | "Sûr" |
| ------------------------------- | ----------------------------------- | ------------------------------------ |
| Risque allergique                | *{TP}* ✅ Allergie correctement détectée | *{FN}* ❌ Allergie non détectée |
| Pas de risque allergique         | *{FP}* ❌ Alerte inutile | *{TN}* ✅ Plat sûr correctement accepté |

La matrice de confusion ne se contente pas de compter les prédictions correctes et incorrectes : elle distingue les différents types d'erreurs, ce qui constitue précisément la base des métriques suivantes.

### Métriques

Maintenant que les différents types de résultats de classification sont clairs (je l'espère), nous pouvons examiner les métriques qui en sont dérivées.

Tout d'abord, l'**accuracy** représente simplement le ratio de prédictions correctes (vraies) par rapport au nombre total de prédictions.

La *précision* se concentre sur les prédictions positives. Dans cet exemple, elle répond à la question : "Lorsque le robot déclenche une alerte, à quelle fréquence a-t-il réellement raison ?".

Le *rappel* (*recall*), quant à lui, se concentre sur les cas réellement positifs. Il répond à la question : "Parmi tous les plats à risque, combien le robot a-t-il réussi à détecter ?".

Revenons à l'exemple du robot de cantine. Le mode *paranoïaque* se caractérise par un rappel (*recall*) élevé, afin de maximiser la sécurité des personnes, même si cela dégrade la précision (*precision*). À l'inverse, le mode *zen* privilégie la précision (*precision*) : les alertes doivent être fiables et les fausses alertes réduites au minimum.

On peut alors se demander pourquoi ne pas simplement considérer l'**accuracy** seule.

Dans l'exemple de la cantine, si le robot est utilisé 10 000 fois, avec seulement 10 plats pouvant réellement déclencher une réaction allergique, et donc 9 990 plats sans risque.

Avec le mode *zen*, le robot ne déclenche une alerte que lorsqu'il est presque certain qu'il existe un risque allergique. Dans ce scénario, il ne déclenche jamais d'alerte, donc 0 des 10 plats à risque sont détectés.

L'accuracy obtenue serait alors presque parfaite : 99,9 % ((0 + 9 990) / 10 000). Cela semble excellent, mais ne protège absolument pas les personnes concernées.

**ℹ️ Résumé**

Selon le coût des erreurs, les modèles de classification ne devraient pas être évalués uniquement avec l'accuracy. La précision et le rappel apportent des informations complémentaires en distinguant les fausses alertes des cas manqués, ce qui aide à choisir le modèle — et même son seuil de décision — le mieux adapté à l'objectif réel.

| Métrique | Formule |
| -------- | ------- |
| Accuracy | (TP + TN) / total |
| Précision | TP / (TP + FP) |
| Rappel | TP / (tous les cas positifs : TP + FN) |

> [*Lire en anglais*](../en/datascience-classification-metrics)
