import { User } from '../entity/User';
import argon2 from 'argon2';
import {
	Arg,
	Ctx,
	Field,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from 'type-graphql';
import { MyContext } from 'src/types';
@ObjectType()
class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}

@Resolver(User)
export class UserResolver {
	@Query(() => String)
	hi() {
		return 'hey';
	}
	@Query(() => [User])
	users() {
		return User.find();
	}
	@Mutation(() => Boolean)
	async register(
		@Arg('username') username: string,
		@Arg('password') password: string,
		@Arg('character') character: string
	) {
		const hashedPassword = await argon2.hash(password);
		try {
			await User.insert({
				username,
				password: hashedPassword,
				character,
			});
		} catch (err) {
			console.log(err);
			return false;
		}
		return true;
	}
	@Mutation(() => UserResponse)
	async login(
		@Arg('username') username: string,
		@Arg('password') password: string,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const user = await User.findOne({ where: { username: username } });
		if (!user) {
			return {
				errors: [
					{
						field: 'Username',
						message: 'Username not found',
					},
				],
			};
		}
		const valid = await argon2.verify(user.password, password);
		if (!valid) {
			return {
				errors: [
					{
						field: 'password',
						message: 'incorrect password',
					},
				],
			};
		}

		req.session.userId = user.id;
		return {
			user,
		};
	}
	@Query(() => User, { nullable: true })
	me(@Ctx() { req }: MyContext) {
		// you are not logged in
		if (!req.session.userId) {
			return null;
		}

		return User.findOne(req.session.userId);
	}
	// @Mutation()
	// async terminate(
	// 	@Arg('Username') Username: String,
	// 	@Arg('Character') Character: String
	// ) {

	// }
}
