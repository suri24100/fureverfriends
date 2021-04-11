########################################################
#
# CMPSC 488: FureverFriends AI Demo
#     Multi Class Text Classification with Bert
#
########################################################


########################################################
# Import
########################################################
from transformers import DistilBertTokenizer
from transformers import TFDistilBertForSequenceClassification
import tensorflow as tf
import pandas as pd
import json
import gc
import numpy as np
import os
import nltk
nltk.download('words')
import torch
########################################################
# Set Up
########################################################
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))
print(tf.config.list_physical_devices('GPU'))
########################################################
# Import Dataset
########################################################
##change path accordingly
train_data_path='adoption_speed_train.csv'
data = pd.read_csv(train_data_path)

print(data.head())

ID = 'PetID'
DATA_COLUMN = 'description'

data_texts = [str(sent) for sent in data["Description"].to_list()] # Features (not-tokenized yet)
words = set(nltk.corpus.words.words())

data_texts = [" ".join(w for w in nltk.wordpunct_tokenize(sent) \
         if w.lower() in words or not w.isalpha()) for sent in data_texts]
data_labels = data["AdoptionSpeed"].to_list() # Labels
print(data_texts[0])
print(data_labels[0])

from sklearn.model_selection import train_test_split

# Split Train and Validation data
train_texts, val_texts, train_labels, val_labels = train_test_split(data_texts, data_labels, test_size=0.2, random_state=0)

# Keep some data for inference (testing)
train_texts, test_texts, train_labels, test_labels = train_test_split(train_texts, train_labels, test_size=0.01, random_state=0)

tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
train_encodings = tokenizer(train_texts, truncation=True, padding=True)
val_encodings = tokenizer(val_texts, truncation=True, padding=True)

train_dataset = tf.data.Dataset.from_tensor_slices((
    dict(train_encodings),
    train_labels
))
val_dataset = tf.data.Dataset.from_tensor_slices((
    dict(val_encodings),
    val_labels
))

model = TFDistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=5)

optimizer = tf.keras.optimizers.Adam(learning_rate=5e-5)
model.compile(optimizer=optimizer, loss=model.compute_loss, metrics=['accuracy'])

model.fit(train_dataset.shuffle(1000).batch(16), epochs=20, batch_size=16,
          validation_data=val_dataset.shuffle(1000).batch(16))
print(model.summary())

save_directory = "./adoption_model"

model.save_pretrained(save_directory)
tokenizer.save_pretrained(save_directory)
