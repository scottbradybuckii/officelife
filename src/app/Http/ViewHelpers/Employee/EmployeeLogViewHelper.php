<?php

namespace App\Http\ViewHelpers\Employee;

use App\Helpers\ImageHelper;
use App\Models\Company\Company;
use App\Models\Company\Employee;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class EmployeeLogViewHelper
{
    /**
     * Collection containing all the audit log entries for this employee.
     * @param mixed $logs
     */
    public static function list($logs, Company $company): Collection
    {
        $logsCollection = collect([]);
        foreach ($logs as $log) {
            $author = $log->author;

            $logsCollection->push([
                'action' => $log->action,
                'localized_content' => $log->content,
                'author' => [
                    'id' => is_null($author) ? null : $author->id,
                    'name' => is_null($author) ? $log->author_name : $author->name,
                    'avatar' => is_null($author) ? null : ImageHelper::getAvatar($author, 34),
                    'url' => is_null($author) ? null : route('employees.show', [
                        'company' => $company,
                        'employee' => $author,
                    ]),
                ],
                'localized_audited_at' => $log->date,
            ]);
        }

        return $logsCollection;
    }

    /**
     * Information about the employee.
     */
    public static function employee(Employee $employee): array
    {
        return [
            'id' => $employee->id,
            'name' => $employee->name,
            'avatar' => ImageHelper::getAvatar($employee, 80),
        ];
    }

    /**
     * Log Types for the employee.
     */
    public static function employeeLogTypes(Employee $employee): array
    {
        $logTypes = DB::table('employee_logs')
            ->select('action')
            ->selectRaw('count(*) as number_of_logs')
            ->where('author_id', $employee->id)
            ->orderBy('action')
            ->groupBy('action')
            ->get()
            ->toArray();
        return $logTypes;
    }
}
