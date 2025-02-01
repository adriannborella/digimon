import csv
import json

def convert_to_array(row, key):
    return row[key].split(', ') if row[key] else []
records = {}
with open('aux.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile, delimiter=';')
    for row in reader:
        digimon_name = row['name']
        records[digimon_name] = {
            **row,
            "digivolve_to": convert_to_array(row, 'digivolve_to'),
            "possible_digimon": convert_to_array(row, 'possible_digimon'),
        }

text_to_save = json.dumps(records)
with open('db.json', 'w') as file:
    file.write(text_to_save)
