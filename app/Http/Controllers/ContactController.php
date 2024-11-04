<?php

namespace App\Http\Controllers;

use App\Events\ContactCreatedEvent;
use App\Events\ContactDeletedEvent;
use App\Events\ContactUpdatedEvent;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ContactResource::collection(Contact::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactRequest $request)
    {
        // The endpoint for creating a contact should intentionally take 20 seconds to respond to simulate a slow network or server load.
        app()->environment('local') && sleep(20);

        $contact = $request->user()->createdContacts()->create(
            $request->validated()
        );

        ContactCreatedEvent::dispatch($contact);

        return response()->json(
            new ContactResource($contact),
            201 // HTTP status code for "Created"
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        return new ContactResource($contact->load('logs'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $contact->fill($request->validated());

        DB::beginTransaction();

        // Users should be able to see the history of edits for each contact.
        // in order to make that happen we will log all changes to the contact:
        foreach ($contact->getDirty() as $field => $valueNew) {
            $valueOld = $contact->getOriginal($field);

            $log = $contact->logs()->make([
                'field' => $field,
                'value_old' => $valueOld,
                'value_new' => $valueNew,
            ]);
            $log->user()->associate($request->user());
            $log->save();
        }

        try {
            $contact->save();

            DB::commit();
        } catch (\Throwable $e) {
            // if we encounter any error when updating the contact
            // we will rollback the logs as well:
            DB::rollBack();

            throw $e;
        }

        ContactUpdatedEvent::dispatch($contact);

        return new ContactResource($contact);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        ContactDeletedEvent::dispatch($contact);

        return response()->noContent();
    }
}
