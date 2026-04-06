import logging
import json
import sys

def setup_logger():
    logger = logging.getLogger("contextcore")
    logger.setLevel(logging.INFO)
    
    handler = logging.StreamHandler(sys.stdout)
    # Professional structured JSON logger
    formatter = logging.Formatter(
        '{"timestamp": "%(asctime)s", "name": "%(name)s", "level": "%(levelname)s", "message": "%(message)s"}'
    )
    handler.setFormatter(formatter)
    
    if not logger.handlers:
        logger.addHandler(handler)
        
    return logger

log = setup_logger()