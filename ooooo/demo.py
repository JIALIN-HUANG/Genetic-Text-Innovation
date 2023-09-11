import pandas as pd

# 读取CSV文件
df = pd.read_csv('file/one-million-reddit-jokes.csv')

# 修改列名
df = df.rename(columns={'selftext': 'key'})

# 保存为新的CSV文件
df.to_csv('file/one-million-reddit-jokes.csv', index=False)
