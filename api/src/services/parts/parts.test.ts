import type { Part } from '@prisma/client'

import { parts, part, createPart, updatePart, deletePart } from './parts'
import type { StandardScenario } from './parts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('parts', () => {
  scenario('returns all parts', async (scenario: StandardScenario) => {
    const result = await parts()

    expect(result.length).toEqual(Object.keys(scenario.part).length)
  })

  scenario('returns a single part', async (scenario: StandardScenario) => {
    const result = await part({ id: scenario.part.one.id })

    expect(result).toEqual(scenario.part.one)
  })

  scenario('creates a part', async () => {
    const result = await createPart({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a part', async (scenario: StandardScenario) => {
    const original = (await part({ id: scenario.part.one.id })) as Part
    const result = await updatePart({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a part', async (scenario: StandardScenario) => {
    const original = (await deletePart({ id: scenario.part.one.id })) as Part
    const result = await part({ id: original.id })

    expect(result).toEqual(null)
  })
})
