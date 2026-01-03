# run.py: Test your custom AI model on stored Q&A data
import sqlite3

def load_training_data(db_path='training_data.db'):
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute('SELECT question, answer_md FROM training_data')
    data = c.fetchall()
    conn.close()
    return data

def custom_ai_answer(question, training_data):
    # Simple similarity: exact match or substring
    for q, a in training_data:
        if question.strip().lower() == q.strip().lower() or question.strip().lower() in q.strip().lower():
            return a
    return None

def main():
    data = load_training_data()
    print('Loaded', len(data), 'training examples.')
    while True:
        q = input('Ask a question (or "exit"): ')
        if q.lower() == 'exit':
            break
        ans = custom_ai_answer(q, data)
        if ans:
            print('Custom AI answer (from training data):\n', ans)
        else:
            print('No similar question found in training data.')

if __name__ == '__main__':
    main()
