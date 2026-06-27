import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { DataSource } from 'typeorm';

export class RoleSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run(): Promise<void> {
    const roleRepository = this.dataSource.getRepository(Role);
    const permissionRepository = this.dataSource.getRepository(Permission);

    const allPermissions = await permissionRepository.find();
    console.log('allPermissions', allPermissions);

    const roles = [
      {
        name: 'super_admin',
        description: 'Super Administrator',
        permissions: allPermissions,
      },
      {
        name: 'admin',
        description: 'Administrator',
        permissions: allPermissions.filter(
          (permission) => !permission.name.startsWith('permissions.'),
        ),
      },
      {
        name: 'customer',
        description: 'Customer',
        permissions: allPermissions.filter((permission) =>
          [
            'bookings.create',
            'bookings.read',
            'bookings.update',
            'payments.create',
            'payments.read',
            'cabs.read',
          ].includes(permission.name),
        ),
      },
    ];

    console.log('roles', roles);

    for (const roleData of roles) {
      let role = await roleRepository.findOne({
        where: { name: roleData.name },
        relations: { permissions: true },
      });

      console.log('role', role);

      if (!role) {
        role = roleRepository.create({
          name: roleData.name,
          description: roleData.description,
          permissions: roleData.permissions,
        });

        await roleRepository.save(role);
      } else {
        role.permissions = roleData.permissions;
        await roleRepository.save(role);
      }
    }

    console.log('Roles seeded successfully');
  }
}
