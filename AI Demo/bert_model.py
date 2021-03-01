# from google.colab import drive
# drive.mount("/GD")

import pandas as pd
import tensorflow as tf
import tensorflow_hub as hub
from datetime import datetime
from sklearn.model_selection import train_test_split
import os

print("tensorflow version : ", tf.__version__)
print("tensorflow_hub version : ", hub.__version__)

#added
import numpy as np
import matplotlib.pyplot as plt
import tensorflow_datasets as tfds
tfds.disable_progress_bar()
from official.modeling import tf_utils
from official import nlp
from official.nlp import bert


#Importing BERT modules
from bert import run_classifier
from bert import optimization
from bert import tokenization

# # Set the output directory for saving model file
# OUTPUT_DIR = '/GD/My Drive/Colab Notebooks/BERT/bert_news_category'
#
# #@markdown Whether or not to clear/delete the directory and create a new one
# DO_DELETE = False #@param {type:"boolean"}
#
# if DO_DELETE:
#   try:
#     tf.gfile.DeleteRecursively(OUTPUT_DIR)
#   except:
#     pass
#
# tf.gfile.MakeDirs(OUTPUT_DIR)
# print('***** Model output directory: {} *****'.format(OUTPUT_DIR))

# train = pd.read_excel("/GD/My Drive/Colab Notebooks/News_category/Datasets/Data_Train.xlsx")
# test = pd.read_excel("/GD/My Drive/Colab Notebooks/News_category/Datasets/Data_Test.xlsx")
#
# from sklearn.model_selection import train_test_split
#
# train, val =  train_test_split(train, test_size = 0.2, random_state = 100)

train = pd.read_excel("Data_Train.xlsx")
test = pd.read_excel("Data_Test.xlsx")

from sklearn.model_selection import train_test_split

train, val =  train_test_split(train, test_size = 0.2, random_state = 100)

#Training set sample
train.head(5)

#Test set sample
test.head()