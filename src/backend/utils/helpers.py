def validate_input(data):
    if not isinstance(data, dict):
        return False
    if 'length' in data and not isinstance(data['length'], int):
        return False
    if 'composition' in data and data['composition'] not in ['random', 'uniform']:
        return False
    return True