interface BaseRole {
    name: string;
    default: boolean;
}

interface Role extends BaseRole {
    permissions: { action: Actions[number]; subject: Subjects[number]; conditions: object }[];
}

interface RoleFull extends Role, Doc {}
