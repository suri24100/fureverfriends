########################################################
#
# CMPSC 488: FureverFriends AI Demo
#     Predicting Description rating Using Trained AI Bert Model
#
########################################################


########################################################
# Import
########################################################
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
from transformers import TFDistilBertForSequenceClassification
import tensorflow as tf
import torch
from flask import Flask, request
import os

########################################################
# Deployment Set Up
########################################################
save_directory = "./adoption_model"
loaded_tokenizer_pt = DistilBertTokenizer.from_pretrained(save_directory)
loaded_model_pt = DistilBertForSequenceClassification.from_pretrained(save_directory, from_tf=True)

save_directory1 = "./playful_model"
loaded_tokenizer_pt1 = DistilBertTokenizer.from_pretrained(save_directory1)
loaded_model_pt1 = DistilBertForSequenceClassification.from_pretrained(save_directory1, from_tf=True)

save_directory2 = "./affectionate_model"
loaded_tokenizer_pt2 = DistilBertTokenizer.from_pretrained(save_directory2)
loaded_model_pt2 = DistilBertForSequenceClassification.from_pretrained(save_directory2, from_tf=True)

save_directory3 = "./social_model"
loaded_tokenizer_pt3 = DistilBertTokenizer.from_pretrained(save_directory3)
loaded_model_pt3 = DistilBertForSequenceClassification.from_pretrained(save_directory3, from_tf=True)

app = Flask(__name__)

@app.route('/description_rating', methods=['POST'])
def get_description_rating():
    test_text = request.data.decode('utf-8')
    print(test_text)
    predict_input_pt = loaded_tokenizer_pt.encode(test_text,
                                     truncation=True,
                                     padding=True,
                                     return_tensors="pt")

    output_pt = loaded_model_pt(predict_input_pt)[0]


    predictions_value_pt = torch.argmax(output_pt[0], dim=-1).item()
    print("Model has predicted an adoption speed of speed of: ")
    print(predictions_value_pt)

    ratings = {0: "5 out of 5 stars", 1: "4 out of 5 stars", 2: "3 out of 5 stars", 3: "2 out of 5 stars", 4: "1 out of 5 stars"}

    print("\n")
    print("Your description has a rating of:")
    print(ratings.get(predictions_value_pt))
    return {'rating' : predictions_value_pt}

@app.route('/attribute_predictor', methods=['POST'])
def get_attributes():
    test_text = request.data.decode('utf-8')
    print(test_text)
    predict_input_pt1 = loaded_tokenizer_pt1.encode(test_text,
                                     truncation=True,
                                     padding=True,
                                     return_tensors="pt")

    output_pt1 = loaded_model_pt1(predict_input_pt1)[0]


    predictions_value_pt1 = torch.argmax(output_pt1[0], dim=-1).item()

    predict_input_pt2 = loaded_tokenizer_pt2.encode(test_text,
                                     truncation=True,
                                     padding=True,
                                     return_tensors="pt")

    output_pt2 = loaded_model_pt2(predict_input_pt2)[0]

    predictions_value_pt2 = torch.argmax(output_pt2[0], dim=-1).item()

    predict_input_pt3 = loaded_tokenizer_pt3.encode(test_text,
                                     truncation=True,
                                     padding=True,
                                     return_tensors="pt")

    output_pt3 = loaded_model_pt3(predict_input_pt3)[0]

    predictions_value_pt3 = torch.argmax(output_pt3[0], dim=-1).item()


    attributes = [predictions_value_pt1, predictions_value_pt2, predictions_value_pt3]
    print("Model has predicted an attribute number of: ")
    print(attributes)

    attributes_names = []
    if predictions_value_pt1 == 1:
        attributes_names.append("playful")
    if predictions_value_pt2 == 1:
        attributes_names.append("affectionate")
    if predictions_value_pt3 == 1:
        attributes_names.append("social")

    print("\n")
    print("Your pet has been viewed as:")
    print(attributes_names)
    return {'attributes' : attributes_names}
