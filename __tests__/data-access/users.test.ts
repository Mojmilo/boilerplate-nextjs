import {createUser} from "@/data-access/users";

describe('Users', () => {
    it('create user', async () => {
        expect(await createUser({
            email: 'test@test.com',
        }));
    });
});