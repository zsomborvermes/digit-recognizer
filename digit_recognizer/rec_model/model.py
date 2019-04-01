import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.externals import joblib
import scipy.io

db = pd.read_pickle('train.pickle')
print(db)

X = db.drop(['label'], axis = 1)
y = db['label']

clf = RandomForestClassifier(n_estimators=50)
clf.fit(X, y)

joblib.dump(clf, 'model_cache/cache.pkl')
