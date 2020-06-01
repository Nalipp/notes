
/* ************************************************************ */
/* pandas getting started */ 
/* ************************************************************ */

*****  note on python  *****
# pandas is installed on python3.6 only (for this system)
# to run a file
#   $ python3.6 filename.py
# to check installed libraries
#   $ pip3.6 list 

*****  note on scientific notation  *****
# to set the format of pandas to display regular notation
# pd.options.display.float_format = '{:20,.2f}'.format


  import numpy as np
  import pandas as pd


# import csv
  df = pd.read_csv("file_name.csv")
  df = pd.read_csv("file_name.csv", encoding = "latin1")

# export as csv
  df.to_csv("new_file_name.csv")

# export as tsv
  df.to_csv("new_file_name.tsv", sep='\t')

# create a dataframe from a series 
  new_df = pd.DataFrame({'column 1':series_name.index, 'count':series_name.values})

# check data type
  print(type(df))

# return first 5 rows
  print(df.head(5))

# return last 5 rows
  print(df.tail(5))

# return column names
  print(df.columns)

# return index count
  print(df.index)

# create a new column
  df['column name'] = series

# delete a column
  del df['column name']

# return array of arrays of tab seperated values
  print(df.values)
  
# return shape/demension of the dataframe (rows x columns)
  print(df.shape)
 
# select a row in a dataframe, this will print it as a series object
  print(df.loc[5])

# print all column datatypes or print individual column dtype
  print(df.dtypes)
  print(df['column-name'].dtype)

# select multiple rows
  print(df.loc[3:6])
  print(df.loc[[2,5,10]])

# print a specific column and print multiple columns
  print(df['column name'])
  print(df[['column name 1', 'column name 2']]

# convert an object to a list/array 
  print(df['column'].tolist())

*******************************************************
manipulating data view

  # find the totalk number of library visits in Wyoming 
  df.loc[df['State'] == 'WY', 'Library Visits'].sum()

# sort by column name
  df.sort_values(['column name'])

# sort by multiple colums (if some values are the same)
  df.sort_values(['column 1', 'column 2'])

# sort by column and specify order
  df.sort_values(['column name'], ascending=[False])


*******************************************************
calculating data

# return basic summary of numberic data
  print(df.describe())

# subtract one column from another
  subtracted = df['column a'] - df['column b']

# add the new column to the existing dataframe
  df['subtracted'] = subtracted

# calculate the mean of a column
  df['column name'].mean()

# calculate standard deviation of a column
  df['column name'].std()

# calculate std of each value in a column and add the values as a new column 
  df['column_std'] = df['column name'].std()
  df['each_std'] = df['column name'] - df['column_std']

# return count value by column 
  column_data = df['column_name']
  series = pd.Series(column_data)
  print(pd.value_counts(series)

create a series 
  pd.Series(['a', 'b', 'e'])
  0  'a'
  1  'b'
  3  'c'

  pd.Series(['a', 'b', 'e'], index=[3, 4, 5])

      
*******************************************************
basic python iteration

  column_names = df.columns.tolist()
  filtered_column = []

  for c in column_names:
      if c.endswith("x"):
        filtered_column.append(c)
  get_row = df[filtered_column]
  print(get_row.head(3))

    length = len()
    push = append()

