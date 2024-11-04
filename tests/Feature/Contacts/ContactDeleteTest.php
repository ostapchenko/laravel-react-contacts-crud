<?php

use App\Events\ContactDeletedEvent;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Support\Facades\Event;

use function Pest\Laravel\actingAs;

test('contact can be deleted', function () {
    Event::fake();

    $user = User::factory()->create();
    $contact = Contact::factory()->create();

    actingAs($user)
        ->json('DELETE', "/api/contacts/{$contact->id}")
        ->assertStatus(204);

    Event::assertDispatched(ContactDeletedEvent::class);
});
