import { NextRequest, NextResponse } from 'next/server'

const DEEPSEEK_API_KEY = 'sk-cbf0812335e5413c980003410d5ed325'
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

export async function POST(request: NextRequest) {
  try {
    const { entityName, dateRange } = await request.json()

    if (!entityName) {
      return NextResponse.json(
        { error: 'Entity name is required' },
        { status: 400 }
      )
    }

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(dateRange || '30'))

    // Create prompt for DeepSeek
    const prompt = `You are a compliance analyst conducting adverse media research. Search for and summarize any negative news, legal issues, regulatory actions, or controversies related to "${entityName}" between ${startDate.toISOString().split('T')[0]} and ${endDate.toISOString().split('T')[0]}.

Please provide:
1. A list of specific adverse media findings (if any)
2. For each finding, include:
   - Title/headline
   - Brief description
   - Date
   - Source
   - Severity level (Critical, High, Medium, Low)
   - Category (Legal, Regulatory, Fraud, Corruption, Money Laundering, Sanctions, Reputational, Other)

Format the response as a JSON array of findings. If no adverse media is found, return an empty array.

Example format:
[
  {
    "title": "Company fined for AML violations",
    "description": "Brief description of the issue",
    "date": "2024-01-15",
    "source": "Financial Times",
    "severity": "High",
    "category": "Regulatory"
  }
]

Return ONLY the JSON array, no additional text.`

    // Call DeepSeek API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a compliance analyst specializing in adverse media research. Provide accurate, factual information about negative news and compliance issues.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('DeepSeek API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to fetch adverse media data from DeepSeek API', details: errorData },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Extract the response content
    const content = data.choices?.[0]?.message?.content || '[]'
    
    // Parse the JSON response
    let findings = []
    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        findings = JSON.parse(jsonMatch[0])
      } else {
        findings = JSON.parse(content)
      }
    } catch (parseError) {
      console.error('Failed to parse DeepSeek response:', parseError)
      // If parsing fails, return a structured error
      return NextResponse.json({
        findings: [],
        error: 'Failed to parse AI response',
        rawResponse: content
      })
    }

    // Ensure all findings have required fields
    const validatedFindings = findings.map((finding: any) => ({
      title: finding.title || 'No title',
      description: finding.description || '',
      date: finding.date || new Date().toISOString().split('T')[0],
      source: finding.source || 'Unknown',
      severity: finding.severity || 'Medium',
      category: finding.category || 'Other',
    }))

    return NextResponse.json({
      entityName,
      dateRange,
      searchDate: new Date().toISOString(),
      findingsCount: validatedFindings.length,
      findings: validatedFindings,
    })

  } catch (error) {
    console.error('Adverse media API error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

