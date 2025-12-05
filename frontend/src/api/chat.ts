import API_BASE_URL from "./config";

// NL2SQL请求类型
export interface NL2SQLRequest {
  question: string;
}

// NL2SQL响应类型
export interface NL2SQLResponse {
  question: string;
  sql: string;
  columns: string[];
  rows: Array<Record<string, any>>;
}

// 错误响应类型
export interface NL2SQLError {
  error: string;
  detail?: string;
  sql?: string;
}

/**
 * 调用后端NL2SQL API
 * 将自然语言转换为SQL并执行查询
 */
export const callNL2SQL = async (question: string): Promise<NL2SQLResponse> => {
  const url = `${API_BASE_URL}/nl2sql/`;
  
  const requestBody: NL2SQLRequest = {
    question: question.trim()
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      // 处理HTTP错误
      const errorData: NL2SQLError = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data: NL2SQLResponse = await response.json();
    return data;

  } catch (error) {
    // 网络错误或其他错误
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to connect to NL2SQL service');
  }
};

/**
 * 格式化SQL查询结果为可读的文本
 */
export const formatQueryResult = (response: NL2SQLResponse): string => {
  const { question, sql, columns, rows } = response;
  
  let result = `Question: ${question}\n\n`;
  result += `Generated SQL:\n${sql}\n\n`;
  
  if (rows.length === 0) {
    result += 'No results found.';
    return result;
  }
  
  result += `Results (${rows.length} rows):\n`;
  
  // 创建简单的表格格式
  if (columns.length > 0) {
    result += columns.join(' | ') + '\n';
    result += columns.map(() => '---').join(' | ') + '\n';
    
    rows.forEach(row => {
      const values = columns.map(col => row[col] || 'NULL');
      result += values.join(' | ') + '\n';
    });
  }
  
  return result;
};