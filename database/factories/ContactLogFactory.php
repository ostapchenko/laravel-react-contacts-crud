<?php

namespace Database\Factories;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ContactLog>
 */
class ContactLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $contacts = Contact::pluck('id')->toArray();
        $users = User::pluck('id')->toArray();

        $possibleFields = [
            'name_first',
            'name_last',
            'email',
            'phone',
        ];

        return [
            'contact_id' => $this->faker->randomElement($contacts),
            'field' => $this->faker->randomElement($possibleFields),
            'value_old' => $this->faker->word,
            'value_new' => $this->faker->word,
            'user_id' => $this->faker->randomElement($users),
        ];
    }
}
