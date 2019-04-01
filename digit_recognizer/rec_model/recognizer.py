import cv2
import os
from django.core.cache import cache
from sklearn.externals import joblib
import numpy as np


def transform_digit():

    model_cache_key = 'model_cache'
    model_rel_path = "digit_recognizer/rec_model/model_cache/cache.pkl"

    model = cache.get(model_cache_key)

    filename = 'test.jpeg'

    original_image = cv2.imread(filename, 0)
    resized_image = cv2.resize(original_image, (28, 28))
    to_predict = resized_image.flatten()

    if model is None:
        model_path = os.path.realpath(model_rel_path)
        model = joblib.load(model_path)
        # save in django memory cache
        cache.set(model_cache_key, model, None)

    return model.predict([to_predict])[0]
