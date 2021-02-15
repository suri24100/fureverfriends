########################################################
#
# CMPSC 488: FureverFriends AI Demo
#     Stochastic GD Activation Function
#
########################################################


########################################################
# Import
########################################################

import math
import numpy as np
from random import seed
from random import random
import matplotlib.pyplot as plt

########################################################
# Functions
########################################################



########################################################
# Main function
########################################################
if __name__ == '__main__':
    file = open("data.txt", "r")

    converged = False
    data = []
    x = []
    y = []


    for line in file:
        data.append([float(num) for num in line.split()])

    Beta_0 = float(input("Enter an initial Beta 0 value: "))
    Beta_1 = float(input("Enter an initial Beta 1 value: "))
    alpha = float(input("Enter a learning rate value (alpha): "))

    for num in data:
        x.append(num[0])
        y.append(num[1])

    b0_deriv = 0.0
    b1_deriv = 0.0
    ep = 0

    while not converged:
        x_len = list(range(len(x)))
        np.random.shuffle(x_len)
        for index in x_len:
            b0_temp = Beta_0
            b1_temp = Beta_1
            y_hat = 1.0 / (1.0 + np.exp(-(b0_temp + b1_temp * x[index])))

            b0_deriv = (y_hat - y[index]) * y_hat * (1.0 - y_hat)
            Beta_0 = b0_temp - alpha * b0_deriv

            b1_deriv = (y_hat - y[index]) * y_hat * (1.0 - y_hat) * x[index]
            Beta_1 = b1_temp - alpha * b1_deriv

        ep += 1
        if (b0_deriv >= -0.00001 and b0_deriv < 0.00001 and b1_deriv >= -0.00001 and b1_deriv < 0.00001) or ep > 100000:
            converged = True

    b = sorted([random() for i in range(100)])
    j_b = [Beta_0 + Beta_1 * i for i in b]
    # Create the plot
    plt.plot(x, y, 'o')
    plt.plot(b, j_b, label='Logistic Regression')

    # Add a title
    plt.title('% of Long Fur vs. % of Dogs in Profile')

    # Add X and y Label
    plt.xlabel('% Long Fur')
    plt.ylabel('% Dogs')
    plt.show()

    x_f = float(input("Percentage of long fur animals in the profile? "))

    y_f = Beta_0 + Beta_1 * x_f
    perc = y_f * 100.0
    print("Should show {:.2f}% in feed".format(perc))

