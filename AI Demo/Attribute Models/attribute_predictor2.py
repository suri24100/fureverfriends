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
test_text = input("Write a description: ")

save_directory1 = "./playful_model"
loaded_tokenizer_pt1 = DistilBertTokenizer.from_pretrained(save_directory1)
loaded_model_pt1 = DistilBertForSequenceClassification.from_pretrained(save_directory1, from_tf=True)

predict_input_pt1 = loaded_tokenizer_pt1.encode(test_text,
                                 truncation=True,
                                 padding=True,
                                 return_tensors="pt")

output_pt1 = loaded_model_pt1(predict_input_pt1)[0]


predictions_value_pt1 = torch.argmax(output_pt1[0], dim=-1).item()

save_directory2 = "./affectionate_model"
loaded_tokenizer_pt2 = DistilBertTokenizer.from_pretrained(save_directory2)
loaded_model_pt2 = DistilBertForSequenceClassification.from_pretrained(save_directory2, from_tf=True)

predict_input_pt2 = loaded_tokenizer_pt2.encode(test_text,
                                 truncation=True,
                                 padding=True,
                                 return_tensors="pt")

output_pt2 = loaded_model_pt2(predict_input_pt2)[0]


predictions_value_pt2 = torch.argmax(output_pt2[0], dim=-1).item()

save_directory3 = "./social_model"
loaded_tokenizer_pt3 = DistilBertTokenizer.from_pretrained(save_directory3)
loaded_model_pt3 = DistilBertForSequenceClassification.from_pretrained(save_directory3, from_tf=True)

predict_input_pt3 = loaded_tokenizer_pt3.encode(test_text,
                                 truncation=True,
                                 padding=True,
                                 return_tensors="pt")

output_pt3 = loaded_model_pt3(predict_input_pt3)[0]

predictions_value_pt3 = torch.argmax(output_pt3[0], dim=-1).item()


attributes = [predictions_value_pt1, predictions_value_pt2, predict_input_pt3]
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
