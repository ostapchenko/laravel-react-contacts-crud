<?php

use App\Models\Contact;
use App\Models\User;

use function Pest\Laravel\actingAs;

test('contact list can be retrieved', function () {
    $user = User::factory()->create();

    Contact::factory(10)->create();

    actingAs($user)
        ->json('GET', '/api/contacts')
        ->assertStatus(200)
        ->assertJsonCount(10, 'data')
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name_first',
                    'name_last',
                    'email',
                    'phone',
                ],
            ],
        ]);
});
