from sklearn.datasets import fetch_openml
mnist = fetch_openml("mnist_784")

from sklearn.model_selection import train_test_split
train_img, test_img, train_lbl, test_lbl = train_test_split(mnist.data, mnist.target, test_size=1/7.0, random_state=0)

from keras.utils import to_categorical
train_lbl = to_categorical(train_lbl)
test_lbl = to_categorical(test_lbl)


from keras.layers import *
from keras.models import Model


input_layer = Input(shape = (784,))
hidden_layer = Dense(256, activation = "sigmoid")(input_layer)
output_layer = Dense(10, activation = "softmax")(hidden_layer)

model = Model(inputs = input_layer, outputs = output_layer)
model.compile(loss='categorical_crossentropy', optimizer ="adam", metrics=["accuracy"])

model.fit(train_img, train_lbl, validation_data = (test_img, test_lbl), epochs = 20, batch_size = 200)

score = model.evaluate(test_img, test_lbl, verbose=0)
print('Test loss: %.4f'% score[0])
print('Test accuracy %.4f'% score[1])

import matplotlib.pyplot as plt
plt.subplot(1,2,1)
plt.imshow(train_img[0].reshape(28,28))

plt.subplot(1,2,2)
plt.imshow(test_img[0].reshape(28,28))
