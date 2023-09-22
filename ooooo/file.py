import os
import random
import pandas as pd
#import multiprocessing as mp
import boto3
from smart_open import open

# 定义处理函数
def process_file(transport_params, object_url, file_name, keyword):
    data = {}
    file_type = file_name.split('.')[-1].lower()
    # print('file_type:', file_type)
    file_name = os.path.splitext(file_name)[0]
    # print('file_name:', file_name)

    if file_type == 'csv':
        # 读取csv文件
        df = pd.read_csv(open(object_url, 'r', transport_params=transport_params, encoding='utf-8'), header=0)
        matching_rows = df[df['key'].str.contains(keyword, case=False, na=False)]
        if len(matching_rows) > 0:
            random_index = random.randint(0, len(matching_rows) - 1)
            # 获取对应的行数据
            random_row = matching_rows.iloc[random_index]
            # 获取文件名
            # print(file_name)
            if file_name == 'amazon':
                data['file'] = 'amazon'
                data['type'] = 'csv'
                data['data'] = {'key': random_row['key'], 'category': random_row['category'],
                                'actual_price': random_row['actual_price'],
                                'discounted_price': random_row['discounted_price'],
                                'about_product': random_row['about_product'],
                                'rating_count': random_row['rating_count'], 'rating': random_row['rating']}
                # print(random_row['key'],random_row['category'],random_row['actual_price'],random_row['discounted_price'],random_row['about_product'],random_row['rating_count'],random_row['rating'])
            if file_name.startswith('ChatGPT'):
                data['file'] = 'ChatGPT'
                data['type'] = 'csv'
                data['data'] = {'key': random_row['key'], 'User': random_row['User'], 'Date': random_row['Date']}
                # print(random_row['key'], random_row['User'], random_row['Date'])
            if file_name == 'musiccaps-public':
                data['file'] = 'musiccaps-public'
                data['type'] = 'csv'
                data['data'] = {'key': random_row['key'], 'aspect_list': random_row['aspect_list']}
                # print(random_row['key'], random_row['aspect_list'])
            if file_name.startswith('one-million-reddit-jokes'):
                data['file'] = 'one-million-reddit-jokes'
                data['type'] = 'csv'
                data['data'] = {'key': random_row['key']}
                # print(random_row['key'])
            if file_name.startswith('PoetryFoundationData'):
                data['file'] = 'PoetryFoundationData'
                data['type'] = 'csv'
                data['data'] = {'key': random_row['key'], 'Poem': random_row['Poem'], 'Poet': random_row['Poet']}
                # print(random_row['key'], random_row['Poem'], random_row['Poet'])
            if file_name.startswith('urbandict-word-defs'):
                data['file'] = 'urbandict-word-defs'
                data['type'] = 'csv'
                data['data'] = {'key': random_row['key'], 'definition': random_row['definition']}
                print(random_row['key'], random_row['definition'])
            if file_name.startswith('wikisent2'):
                data['file'] = 'wikisent2'
                data['type'] = 'csv'
                data['data'] = {'key': random_row['key']}
        else:
            data['file'] = file_name
            data['type'] = 'csv'
            data['data'] = {'key': ''}

    elif file_type == 'txt':
        # 读取txt文件
        lines = open(object_url, 'r', transport_params=transport_params, encoding='utf8').readlines()
        # 查找包含关键词的行
        matching_lines = [line.strip() for line in lines if keyword.lower() in line.lower()]
        if len(matching_lines) > 0:
            # 打印整行
            random_index = random.randint(0, len(matching_lines) - 1)
            # 获取对应的行数据
            random_line = matching_lines[random_index]
            data['file'] = file_name
            data['type'] = 'txt'
            data['data'] = {'key': random_line}
        else:
            data['file'] = file_name
            data['type'] = 'txt'
            data['data'] = {'key': ''}
    else:
        print('不支持的文件类型')
    return data

# 设置关键词和文件夹路径
if __name__ == '__main__':
    # mp.freeze_support()
    keyword = 'goal'
    # folder_path = 'file'
    # 获取文件列表
    # file_list = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if
    #              f.endswith('.csv') or f.endswith('.txt')]

    file_list = []

    s3_client = boto3.client(service_name='s3', endpoint_url='https://s3.tebi.io')
    s3_resource = boto3.resource(service_name='s3', endpoint_url='https://s3.tebi.io')
    bucket_name = 'genetic-text-innovation'
    bucket = s3_resource.Bucket(bucket_name)
    transport_params={'client': s3_client}

    for obj in bucket.objects.filter(Prefix='ooooo/file/'):
        object_url = 's3://' + bucket_name + '/' + obj.key
        file_name = obj.key.split('/')[-1]
        file_list.append((object_url, file_name))

    #pool = mp.Pool(mp.cpu_count())
    # 处理文件
    #results = pool.starmap(process_file, [(selected_file[0], selected_file[1], keyword)])

    unmatched_files = set()
    file_data = {}
    max_attempt = 100
    for i in range(max_attempt):
        # 随机选择一个文件
        selected_file = random.choice(file_list)
        while selected_file in unmatched_files:
            selected_file = random.choice(file_list)
        file_data = process_file(transport_params, selected_file[0], selected_file[1], keyword)
        if file_data and file_data['data'] != {'key': ''}:
            print('Found the file containing input keyword:', selected_file[0])
            print('file_data:', file_data)
            break
        unmatched_files.add(selected_file)

    if not file_data or file_data['data'] == {'key': ''}:
        print(f'No file containing input keyword has been found after max attempt ({max_attempt})')
