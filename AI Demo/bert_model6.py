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
########################################################
# Set Up
########################################################
##use downloaded model, change path accordingly
# BERT_VOCAB= './uncased_L-12_H-768_A-12/vocab.txt'
# BERT_INIT_CHKPNT = './uncased_L-12_H-768_A-12/bert_model.ckpt'
# BERT_CONFIG = './uncased_L-12_H-768_A-12/bert_config.json'
#
# tokenization.validate_case_matches_checkpoint(True,BERT_INIT_CHKPNT)
# tokenizer = tokenization.FullTokenizer(
#       vocab_file=BERT_VOCAB, do_lower_case=True)
#
# print(tokenizer.tokenize("This here's an example of using the BERT tokenizer"))

########################################################
# Import Dataset
########################################################
##change path accordingly
train_data_path='train.csv'
#train = pd.read_csv(train_data_path)
#test = pd.read_csv('test.csv')
data = pd.read_csv(train_data_path)

print(data.head())

ID = 'pet_id'
DATA_COLUMN = 'description'
LABEL_COLUMNS = ['Playful','Talkative','Adventurous','Affectionate','Independent','Energetic', 'Calm', 'Protective', 'Quiet', 'Social']

X = data.drop(LABEL_COLUMNS, axis =1)
print(X.shape)
print(X.head())
y = data.drop([ID, DATA_COLUMN], axis=1)
print(y.shape)
print(y.head())

#data['Description'] = (data['description'].map(str) +' '+ data['tags']).apply(lambda row: row.strip())

data_texts = data["description"].to_list() # Features (not-tokenized yet)
print(data_texts[0])
data_labels = y.to_numpy()
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

model = TFDistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=10)

optimizer = tf.keras.optimizers.Adam(learning_rate=5e-5)
model.compile(optimizer=optimizer, loss=model.compute_loss, metrics=['accuracy'])

model.fit(train_dataset.shuffle(1000).batch(16), epochs=3, batch_size=16,
          validation_data=val_dataset.shuffle(1000).batch(16))