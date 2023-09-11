import argparse
import os
import pandas

def main(file_path: str, chunksize=3000):
    # chunksize controls the number of rows to be loaded into dataframe in each iteration
    # change chunksize to control the size of output csv file
    file_type = file_path.split('.')[-1]
    print('file_type:', file_type)
    file_name = os.path.splitext(file_path)[0]
    print('file_name:', file_name)
    if file_type.lower() == 'txt':
        df = pandas.read_csv(file_path, sep='\r', header=None, names=['key'], iterator=True, chunksize=chunksize)
    elif file_type.lower() == 'csv':
        df = pandas.read_csv(file_path, iterator=True, chunksize=chunksize)
    for i, chunk in enumerate(df):
        chunk_file_path = f"{file_path.rstrip('.'+file_type)}_chunk_{i}.csv"
        print('Generating chunk csv file:', chunk_file_path)
        chunk.to_csv(chunk_file_path, index=False)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='csv data conversion and splitting utility')
    parser.add_argument('-fp', '--file_path', required=True, type=str, default=None,
                        help='The path of the input file used for data conversion and splitting')
    args = parser.parse_args()
    main(args.file_path)
