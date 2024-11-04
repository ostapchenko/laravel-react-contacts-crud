<?php

use App\Events\ContactUpdatedEvent;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Support\Facades\Event;

use function Pest\Laravel\actingAs;
use function PHPUnit\Framework\assertEquals;

test('contact can be updated', function () {
    $user = User::factory()->create();

    $contact = Contact::factory()->create();

    Event::fake();

    $newNameFirst = fake()->name;
    $newNameLast = fake()->name;
    $newEmail = fake()->unique()->safeEmail;
    $newPhone = fake()->e164PhoneNumber;

    actingAs($user)
        ->json('PUT', "/api/contacts/{$contact->id}", [
            'name_first' => $newNameFirst,
            'name_last' => $newNameLast,
            'email' => $newEmail,
            'phone' => $newPhone,
        ])
        ->assertStatus(200)
        ->assertJson([
            'data' => [
                'id' => $contact->id,
                'name_first' => $newNameFirst,
                'name_last' => $newNameLast,
                'email' => $newEmail,
                'phone' => $newPhone,
            ],
        ]);

    assertEquals(4, $contact->logs()->count());

    Event::assertDispatched(ContactUpdatedEvent::class);
});
