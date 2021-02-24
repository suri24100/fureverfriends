import pandas as pd
data_pd = pd.read_csv("FureverFriends Dataset.csv")

#Using bag of word vectors
from sklearn.feature_extraction.text import CountVectorizer
vectorizer = CountVectorizer(max_features=200)
X = vectorizer.fit_transform(data_pd["review"].values)
X = X.toarray()

data_pd["label"] = data_pd["sentiment"].map({'positive': 1, 'negative': 0})
data_pd.head()
y = data_pd["label"].values

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42, stratify=y)

X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.2, random_state=42, stratify=y_train)


print (X_train.shape,X_test.shape, X_val.shape)

from keras.layers import *
from keras.models import Model
from keras.callbacks import ModelCheckpoint


input_layer = Input(shape=(200,))
dense_layer1 = Dense(100) (input_layer)
dense_layer2= Dense(10, activation="tanh")(dense_layer1)
dense_layer = Dense(1, activation="sigmoid")(dense_layer2)

model = Model(inputs=input_layer, outputs=dense_layer)
model.compile(loss='binary_crossentropy', optimizer="adam",metrics=["accuracy"])
mc = ModelCheckpoint("best_checkpoint.h5", monitor="val_acc" , save_best_only=True, save_weights_only=True)

model.fit(X_train,y_train,validation_data=(X_val,y_val), epochs= 20, batch_size=20, callbacks=[mc])

# model.load_weights("best_checkpoint.h5")

y_test_pred = model.predict(X_test)
y_test_pred = [1 if pred > 0.5 else 0 for pred in y_test_pred ]

import numpy as np
print("Acc:",(1 - np.sum(np.abs(y_test_pred- y_test))/len(y_test_pred)))
