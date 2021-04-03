from openpyxl import Workbook, load_workbook
import operator

file_name1 = 'petfinder-profiledata-allanimals_FINAL.xlsx'

workbook1 = load_workbook(file_name1)

sheet1 = workbook1['Sheet 1 - petfinder-profiledata']
keywords = ["playful", "playing", "play", "loves playing", "loves to play", "talkative", "adventurous",
            "affectionate", "independent","energetic","calm","protective", "quiet", "social"]


for row in sheet1.iter_rows(min_row=3,max_row=5500):
    for cell in row:
        if isinstance(cell.value, int) or cell.value == None:
            continue
        elif any(word in cell.value.lower().split() for word in keywords):
            print(cell.row)
            sheet1.delete_rows(cell.row,1)
            break

sheet1.delete_rows(5501,sheet1.max_row)


workbook1.save(file_name1)