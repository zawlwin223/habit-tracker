/* eslint-disable prettier/prettier */

export const habitItemSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    days: {
      type: 'object',
      properties: {
        total: {
          type: 'number'
        },
        success: {
          type: 'array'
        },
        fail: {
          type: 'array'
        }
      }
    },
    weeks: {
      type: 'object',
      properties: {
        total: {
          type: 'number'
        },
        success: {
          type: 'array'
        },
        fail: {
          type: 'array'
        }
      }
    }
  }
}
