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

########################################################
# Set Up
########################################################
save_directory = "./adoption_model"
loaded_tokenizer_pt = DistilBertTokenizer.from_pretrained(save_directory)
loaded_model_pt = DistilBertForSequenceClassification.from_pretrained(save_directory, from_tf=True)

test_text = input("Write a description:")

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
