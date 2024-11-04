<?php

use App\Models\Contact;
use App\Models\ContactLog;
use App\Models\User;

use function Pest\Laravel\actingAs;

test('contact can be shown', function () {
    $user = User::factory()->create();

    $contact = Contact::factory()->create();

    actingAs($user)
        ->get("/api/contacts/{$contact->id}")
        ->assertStatus(200)
        ->assertJson([
            'data' => [
                'id' => $contact->id,
                'name_first' => $contact->name_first,
                'name_last' => $contact->name_last,
                'email' => $contact->email,
                'phone' => $contact->phone,
                'logs' => [],
            ],
        ]);
});

test('contact can be shown with logs', function () {
    $user = User::factory()->create();

    $contact = Contact::factory()->create();

    $logs = ContactLog::factory(10)->for($contact)->create();

    actingAs($user)
        ->json('GET', "/api/contacts/{$contact->id}")
        ->assertStatus(200)
        ->assertJson([
            'data' => [
                'id' => $contact->id,
                'name_first' => $contact->name_first,
                'name_last' => $contact->name_last,
                'email' => $contact->email,
                'phone' => $contact->phone,
                'logs' => [], // it will check only the array type
            ],
        ])
        ->assertJsonCount($logs->count(), 'data.logs');
});

test('unexisting contact URL returns 404', function () {
    $user = User::factory()->create();

    $contactId = fake()->uuid();

    actingAs($user)
        ->json('GET', "/api/contacts/{$contactId}")
        ->assertStatus(404);
});
