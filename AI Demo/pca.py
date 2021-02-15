########################################################
#
# CMPSC 488: FureverFriends AI Demo
#          Principal Component Analysis
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

#Returns eigenvalues of matrix
def eig_values(matrix):
    a = 1
    b = -(matrix[0][0] + matrix[1][1])
    c = (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0])
    l1 = (-b + math.sqrt((b**2) - (4 * a * c))) / (2 * a)
    l2 = (-b - math.sqrt((b**2) - (4 * a * c))) / (2 * a)
    return l1, l2

#Returns eigenvectors of matrix
def eig_vectors(matrix, lamb1, lamb2):
    s1 = (lamb1 - matrix[0][0]) / matrix[0][1]
    u1 = [1.0, s1]
    s2 = (lamb2 - matrix[0][0]) / matrix[0][1]
    u2 = [1.0, s2]
    return u1, u2

#Returns eigenvectors of matrix in norm form
def eig_norm_vectors(u1, u2):
    norm1 = math.sqrt(u1[0]**2 + u1[1]**2)
    u1_norm = [(u1[0] / norm1), (u1[1] / norm1)]

    norm2 = math.sqrt(u2[0] ** 2 + u2[1] ** 2)
    u2_norm = [(u2[0] / norm2), (u2[1] / norm2)]

    sum1 = u1_norm[0] ** 2 + u1_norm[1] ** 2
    sum2 = u2_norm[0] ** 2 + u2_norm[1] ** 2
    for i in range(len(u1_norm)):
        u1_norm[i] = u1_norm[i] / sum1
        u2_norm[i] = u2_norm[i] / sum2
    return u1_norm , u2_norm

#Returns True if matrix is symmetric and false otherwise
def is_symmetric(matrix, matrix_T):
    for i in range(2):
        for j in range(2):
            if matrix[i][j] != matrix_T[i][j]:
                return False
    return True

#Returns True if matrix decomposition is correct and false otherwise
def decomp_matrix(matrix, lamb1, lamb2, u1_norm,u2_norm):
    V_T = np.array([u1_norm, u2_norm])
    V = V_T.T
    print("V = {}".format(V))
    D = np.array([[lamb1, 0.0], [0.0, lamb2]])
    B = np.dot(np.dot(V,D),V_T)
    for i in range(2):
        for j in range(2):
            if abs(matrix[i][j] - B[i][j]) > 1/1000:
                return False
    return True

#returning true if data can be loss according to user input
def dim_educt(lamb1, lamb2, loss_data):
    return lamb2 / lamb1 <= loss_data

def testing_graphs(SAMPLE_SIZE):
    seed(1)
    num_variables = 2
    linalg = np.linalg

    cov1 = [[0.3, 0.2], [0.2, 0.2]]
    L1 = linalg.cholesky(cov1)
    # print(L1.shape)
    # (2, 2)
    uncorrelated1 = np.random.standard_normal((num_variables, SAMPLE_SIZE))
    mean1 = [-0.5, -0.5]
    correlated1 = np.dot(L1, uncorrelated1) + np.array(mean1).reshape(2, 1)

    cov2 = [[1.75, 1.75], [1.75, 1.80]]
    L2 = linalg.cholesky(cov2)
    # print(L2.shape)
    # (2, 2)
    uncorrelated2 = np.random.standard_normal((num_variables, SAMPLE_SIZE))
    mean2 = [1, 1]
    correlated2 = np.dot(L2, uncorrelated2) + np.array(mean2).reshape(2, 1)

    cov3 = [[0.3, -0.2], [-0.2, 0.2]]
    L3 = linalg.cholesky(cov3)
    # print(L1.shape)
    # (2, 2)
    uncorrelated3 = np.random.standard_normal((num_variables, SAMPLE_SIZE))
    mean3 = [0, 0]
    correlated3 = np.dot(L3, uncorrelated3) + np.array(mean3).reshape(2, 1)

    cov4 = [[1.75, -1.75], [-1.75, 1.80]]
    L4 = linalg.cholesky(cov4)
    # print(L2.shape)
    # (2, 2)
    uncorrelated4 = np.random.standard_normal((num_variables, SAMPLE_SIZE))
    mean4 = [0, 0]
    correlated4 = np.dot(L4, uncorrelated4) + np.array(mean4).reshape(2, 1)

    # print(correlated.shape)
    # (2, 1000)
    plt.subplot(2, 2, 1)
    plt.scatter(correlated1[0, :], correlated1[1, :], c='blue')
    plt.title('PCA 1')
    plt.xlabel('long hair')
    plt.ylabel('dog')

    plt.subplot(2, 2, 2)
    plt.scatter(correlated2[0, :], correlated2[1, :], c='blue')
    plt.title('PCA 2')
    plt.xlabel('short hair')
    plt.ylabel('cat')

    plt.subplot(2, 2, 3)
    plt.scatter(correlated3[0, :], correlated3[1, :], c='blue')
    plt.title('PCA 3')
    plt.xlabel('young animal')
    plt.ylabel('fish')

    plt.subplot(2, 2, 4)
    plt.scatter(correlated4[0, :], correlated4[1, :], c='blue')
    plt.title('PCA 4')
    plt.xlabel('wings')
    plt.ylabel('hamster')
    plt.show()

    return correlated1, correlated2, correlated3, correlated4





########################################################
# Main function
########################################################
if __name__ == '__main__':
    SAMPLE_SIZE = int(input("Enter sample size: "))
    TESTING_DATA = True
    #gathering data from graphs

    #Use for testing data
    #created a correlated data with 4 test cases
    #Same computations as main program, only difference is that it does not
    #required user data, only user input is the sample size of data
    if TESTING_DATA:
        data1, data2, data3, data4 = testing_graphs(SAMPLE_SIZE)
        x1 = data1[0, :]
        y1 = data1[1, :]
        x2 = data2[0, :]
        y2 = data2[1, :]
        x3 = data3[0, :]
        y3 = data3[1, :]
        x4 = data4[0, :]
        y4 = data4[1, :]

        sum_x1 = 0
        sum_y1 = 0
        sum_xy1 = 0
        sum_x2 = 0
        sum_y2 = 0
        sum_xy2 = 0
        sum_x3 = 0
        sum_y3 = 0
        sum_xy3 = 0
        sum_x4 = 0
        sum_y4 = 0
        sum_xy4 = 0

        for i in range(SAMPLE_SIZE):
            sum_x1 += x1[i]
            sum_y1 += y1[i]
            sum_x2 += x2[i]
            sum_y2 += y2[i]
            sum_x3 += x3[i]
            sum_y3 += y3[i]
            sum_x4 += x4[i]
            sum_y4 += y4[i]

        e_x1 = sum_x1/ SAMPLE_SIZE
        e_y1 = sum_y1 / SAMPLE_SIZE
        e_x2 = sum_x2 / SAMPLE_SIZE
        e_y2 = sum_y2 / SAMPLE_SIZE
        e_x3 = sum_x3 / SAMPLE_SIZE
        e_y3 = sum_y3 / SAMPLE_SIZE
        e_x4 = sum_x4 / SAMPLE_SIZE
        e_y4 = sum_y4 / SAMPLE_SIZE

        sum_e_x1 = 0
        sum_e_y1 = 0
        sum_e_x2 = 0
        sum_e_y2 = 0
        sum_e_x3 = 0
        sum_e_y3 = 0
        sum_e_x4 = 0
        sum_e_y4 = 0

        for i in range(SAMPLE_SIZE):
            sum_e_x1 += (x1[i] - e_x1)**2
            sum_e_y1 += (y1[i] - e_y1)**2
            sum_xy1 += (x1[i] - e_x1)*(y1[i] - e_y1)

            sum_e_x2 += (x2[i] - e_x2) ** 2
            sum_e_y2 += (y2[i] - e_y2) ** 2
            sum_xy2 += (x2[i] - e_x2)*(y2[i] - e_y2)

            sum_e_x3 += (x3[i] - e_x3) ** 2
            sum_e_y3 += (y3[i] - e_y3) ** 2
            sum_xy3 += (x3[i] - e_x3)*(y3[i] - e_y3)

            sum_e_x4 += (x4[i] - e_x4) ** 2
            sum_e_y4 += (y4[i] - e_y4) ** 2
            sum_xy4 += (x4[i] - e_x4)*(y4[i] - e_y4)

        var_x1 = sum_e_x1 / (SAMPLE_SIZE - 1)
        var_y1 = sum_e_y1 / (SAMPLE_SIZE - 1)
        var_x2 = sum_e_x2 / (SAMPLE_SIZE - 1)
        var_y2 = sum_e_y2 / (SAMPLE_SIZE - 1)
        var_x3 = sum_e_x3 / (SAMPLE_SIZE - 1)
        var_y3 = sum_e_y3 / (SAMPLE_SIZE - 1)
        var_x4 = sum_e_x4 / (SAMPLE_SIZE - 1)
        var_y4 = sum_e_y4 / (SAMPLE_SIZE - 1)

        cov1 = sum_xy1 / (SAMPLE_SIZE - 1)
        cov2 = sum_xy2 / (SAMPLE_SIZE - 1)
        cov3 = sum_xy3 / (SAMPLE_SIZE - 1)
        cov4 = sum_xy4 / (SAMPLE_SIZE - 1)

        A1 = np.array([[var_x1, cov1], [cov1, var_y1]])
        A2 = np.array([[var_x2, cov2], [cov2, var_y2]])
        A3 = np.array([[var_x3, cov3], [cov3, var_y3]])
        A4 = np.array([[var_x4, cov4], [cov4, var_y4]])

        print("A1 = {}".format(A1))
        print("P1 = {}".format(np.cov(x1, y1)))
        lamb1, lamb2 = eig_values(A1)
        print("lambda1 = {}".format(lamb1))
        print("lambda2 = {}".format(lamb2))
        u1, u2 = eig_vectors(A1, lamb1, lamb2)
        u1_norm, u2_norm = eig_norm_vectors(u1, u2)
        print("u1 = {}".format(u1_norm))
        print("u2 = {}".format(u2_norm))
        print(decomp_matrix(A1, lamb1, lamb2, u1_norm, u2_norm))
        loss_data = float(input("How much percentage of data are you willing to loose? ")) / 100
        if dim_educt(lamb1, lamb2, loss_data):
            print("Should do dimensional reduction")
        else:
            print("Should not do dimensional reduction")
        print("\n")

        print("A2 = {}".format(A2))
        print("P2 = {}".format(np.cov(x2, y2)))
        lamb3, lamb4 = eig_values(A2)
        print("lambda3 = {}".format(lamb3))
        print("lambda4 = {}".format(lamb4))
        u3, u4 = eig_vectors(A2, lamb3, lamb4)
        u3_norm, u4_norm = eig_norm_vectors(u3, u4)
        print("u3 = {}".format(u3_norm))
        print("u4 = {}".format(u4_norm))
        print(decomp_matrix(A2, lamb3, lamb4, u3_norm, u4_norm))
        loss_data = float(input("How much percentage of data are you willing to loose? ")) / 100
        if dim_educt(lamb3, lamb4, loss_data):
            print("Should do dimensional reduction")
        else:
            print("Should not do dimensional reduction")
        print("\n")

        print("A3 = {}".format(A3))
        print("P3 = {}".format(np.cov(x3, y3)))
        lamb5, lamb6 = eig_values(A3)
        print("lambda5 = {}".format(lamb5))
        print("lambda6 = {}".format(lamb6))
        u5, u6 = eig_vectors(A3, lamb5, lamb6)
        u5_norm, u6_norm = eig_norm_vectors(u5, u6)
        print("u5 = {}".format(u5_norm))
        print("u6 = {}".format(u6_norm))
        print(decomp_matrix(A3, lamb5, lamb6, u5_norm, u6_norm))
        loss_data = float(input("How much percentage of data are you willing to loose? ")) / 100
        if dim_educt(lamb5, lamb6, loss_data):
            print("Should do dimensional reduction")
        else:
            print("Should not do dimensional reduction")
        print("\n")


        print("A4 = {}".format(A4))
        print("P4 = {}".format(np.cov(x4, y4)))
        lamb7, lamb8 = eig_values(A4)
        print("lambda7 = {}".format(lamb7))
        print("lambda8 = {}".format(lamb8))
        u7, u8 = eig_vectors(A4, lamb7, lamb8)
        u7_norm, u8_norm = eig_norm_vectors(u7, u8)
        print("u7 = {}".format(u7_norm))
        print("u8 = {}".format(u8_norm))
        print(decomp_matrix(A4, lamb7, lamb8, u7_norm, u8_norm))
        loss_data = float(input("How much percentage of data are you willing to loose? ")) / 100
        if dim_educt(lamb7, lamb8, loss_data):
            print("Should do dimensional reduction")
        else:
            print("Should not do dimensional reduction")
        print("\n")

    else:
        sum_x = 0
        sum_y = 0
        x = []
        y = []
        for i in range(SAMPLE_SIZE):
            x.append(float(input("x = ")))
            y.append(float(input("y = ")))
            sum_x += x[i]
            sum_y += y[i]

        e_x = sum_x / SAMPLE_SIZE
        e_y = sum_y / SAMPLE_SIZE

        sum_e_x = 0
        sum_e_y = 0
        sum_xy = 0
        for i in range(SAMPLE_SIZE):
            sum_e_x += (x[i] - e_x)**2
            sum_e_y += (y[i] - e_y)**2
            sum_xy += (x[i] - e_x)*(y[i] - e_y)

        var_x = sum_e_x / (SAMPLE_SIZE - 1)
        var_y = sum_e_y / (SAMPLE_SIZE - 1)

        cov1 = sum_xy / (SAMPLE_SIZE - 1)

        A = np.array([[var_x, cov1], [cov1, var_y]])

        print("A = {}".format(A))
        lamb1, lamb2 = eig_values(A)
        print("lambda1 = {}".format(lamb1))
        print("lambda2 = {}".format(lamb2))
        u1, u2 = eig_vectors(A, lamb1, lamb2)
        u1_norm, u2_norm = eig_norm_vectors(u1, u2)
        print("u1 = {}".format(u1_norm))
        print("u2 = {}".format(u2_norm))
        loss_data = float(input("How much percentage of data are you willing to loose? ")) / 100
        if dim_educt(lamb1, lamb2, loss_data):
            print("Should do dimensional reduction")
        else:
            print("Should not do dimensional reduction")
        print("\n")















