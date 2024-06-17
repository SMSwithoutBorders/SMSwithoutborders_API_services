"""
Module for handling Device ID.
"""

import hmac
import hashlib


def compute_device_id(secret_key, phone_number, public_key) -> str:
    """
    Compute a device ID using HMAC and SHA-256.

    Args:
        secret_key (bytes): The secret key used for HMAC.
        phone_number (str): The phone number to be included in the HMAC input.
        public_key (str): The public key to be included in the HMAC input.

    Returns:
        str: The hexadecimal representation of the HMAC digest.
    """
    combined_input = phone_number + public_key
    hmac_object = hmac.new(secret_key, combined_input.encode("utf-8"), hashlib.sha256)
    return hmac_object.hexdigest()
