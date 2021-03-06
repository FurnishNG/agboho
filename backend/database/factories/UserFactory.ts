import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import CompanyFactory from './CompanyFactory'
import UserProfileFactory from './UserProfileFactory'
import { ROLES } from 'Database/data/roles'
import Role from 'App/Models/Role'
import { appendFile } from 'fs/promises'
import Logger from '@ioc:Adonis/Core/Logger'
import { DateTime } from 'luxon'

const getRoles = async function () {
  const superAdminRole = await Role.findBy('name', ROLES.SUPERADMIN)
  const companyAdminRole = await Role.findBy('name', ROLES.COMPANY_ADMIN)
  const companyEditorRole = await Role.findBy('name', ROLES.COMPANY_EDITOR)
  const companyStaffRole = await Role.findBy('name', ROLES.COMPANY_STAFF)

  return {
    superAdminRole: superAdminRole?.id,
    companyAdminRole: companyAdminRole?.id,
    companyEditorRole: companyEditorRole?.id,
    companyStaffRole: companyStaffRole?.id,
  }
}

const UserFactory = Factory.define(User, async ({ faker }) => {
  const generatedUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    login_status: faker.datatype.boolean(),
    is_account_activated: faker.datatype.boolean(),
    is_email_verified: faker.datatype.boolean(),
  }

  // Log `generatedUser` to file
  const NOW = DateTime.utc().toISO()
  const data = `[${NOW}]\n` + JSON.stringify(generatedUser) + '\n\n'

  const relativePath = 'database/data/seeded_users.txt'
  appendFile(relativePath, data, { encoding: 'utf-8' }).catch((error) =>
    Logger.error('Error after user creation: \nError:\n%j', error)
  )

  return generatedUser
})
  .state('fullAccess', (user) => {
    user.loginStatus = user.isAccountActivated = user.isEmailVerified = true
    return user
  })
  .state('superAdmin', async (user) => {
    const roles = await getRoles()
    user.roleId = roles.superAdminRole!
    user.loginStatus = user.isAccountActivated = user.isEmailVerified = true
    return user
  })
  .state('companyAdmin', async (user) => {
    const roles = await getRoles()
    user.roleId = roles.companyAdminRole!
    user.loginStatus = user.isAccountActivated = user.isEmailVerified = true
    return user
  })
  .state('companyEditor', async (user) => {
    const roles = await getRoles()
    user.roleId = roles.companyEditorRole!
    user.loginStatus = user.isAccountActivated = user.isEmailVerified = true
    return user
  })
  .state('companyStaff', async (user) => {
    const roles = await getRoles()
    user.roleId = roles.companyStaffRole!
    user.loginStatus = user.isAccountActivated = user.isEmailVerified = true
    return user
  })
  .relation('companies', () => CompanyFactory)
  .relation('profile', () => UserProfileFactory)
  .build()

export default UserFactory
