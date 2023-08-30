#importing libraries
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler
import flask
from flask import Flask, jsonify, render_template
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import numpy as np
from sklearn.manifold import MDS

#reading in data and imputing it
# data = pd.read_csv("data_excel_check_dup.csv") 
#above is the main file
data = pd.read_csv("data.csv")
data['Inspection Summary Result'] = data['Inspection Summary Result'].replace({pd.NA: 'None'})
# data = data.iloc[0:1776]
impute = data['Violation Status'].fillna('Violation Closed')
data['Violation Status'] = impute
cols = data.columns
#changing col names
data = data.rename(columns={'Maximum Capacity':'MaxCap','Years in operations':'Years',
                            'Violation Rate Percent':'Violation%',
       'Total Educational Workers':'TotalWorkers', 'Public Health Hazard Violation Rate':'PHHViolation%',
       'Critical Violation Rate':'CriticalViolation%'})

#making data for PCP plot
# data_pcp = data[['Maximum Capacity','Years in operations',
# 'Violation Rate Percent','Total Educational Workers',
#  'Public Health Hazard Violation Rate','Critical Violation Rate']]
# changed_cols = ['MaxCap', 'Years', 'Violation%', 'TotalWorkers',
#                 'PHHViolation%','CriticalViolation%']
# data_pcp.columns = changed_cols

#code for data_mds
data_num = data[['MaxCap','Years','Violation%','TotalWorkers',
'PHHViolation%','CriticalViolation%']]
num_fet = list(data_num.columns)
ss = StandardScaler()
scaled_num_data = pd.DataFrame(ss.fit_transform(data_num), columns=num_fet)
#creating a MDS object and doing MDS on numeric data
embedding = MDS(n_components=2, random_state=1)
mds = embedding.fit_transform(scaled_num_data)
mds = pd.DataFrame(mds, columns=['X', 'Y'])
data['X'] = mds['X']
data['Y'] = mds['Y']

#updating the summary column
summary = data['Inspection Summary Result']
a = []
for i in summary:
    # print(i)
    b = i.split("-")
    a.append(b[-1])
a = pd.Series(a)
# a.replace('Monitoring Inspection Non', 'Monitoring Inspection Non-Routine',
#  inplace=True)
# a.replace('Initial Annual Inspection ', 'Initial Annual Inspection',
#  inplace=True)
# a.replace('Compliance Inspection of Open Violations ',
#  'Compliance Inspection of Open Violations', inplace=True)
a.replace('opened', ' Reinspection Required', inplace=True)
data['Inspection Summary Result'] = a

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/plot1_data')
def plot1_data():
    return jsonify(data.to_dict("records"))

# @app.route('/pcp_plot')
# def pcp_plot():
#     return jsonify(data_pcp.to_dict("records"))

if __name__ == '__main__':
    app.run(port=5004,debug=True)