<?php

use App\Events\ContactCreatedEvent;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Support\Facades\Event;

use function Pest\Laravel\actingAs;

test('new contacts can be stored', function () {
    $user = User::factory()->create();

    Event::fake();

    actingAs($user)
        ->json(
            'POST', '/api/contacts', [
                'name_first' => fake()->name,
                'name_last' => fake()->name,
                'email' => fake()->unique()->safeEmail,
                'phone' => fake()->e164PhoneNumber,
            ])
        ->assertStatus(201);

    Event::assertDispatched(ContactCreatedEvent::class);
});

test('new contacts cannot be stored with existing email', function () {
    $user = User::factory()->create();

    $contact = Contact::factory()->create();

    Event::fake();

    actingAs($user)
        ->json(
            'POST',
            '/api/contacts',
            [
                'name_first' => fake()->name,
                'name_last' => fake()->name,
                'email' => $contact->email,
                'phone' => fake()->e164PhoneNumber,
            ]
        )
        ->assertStatus(422)
        ->assertJsonValidationErrors('email');

    Event::assertNotDispatched(ContactCreatedEvent::class);
});
